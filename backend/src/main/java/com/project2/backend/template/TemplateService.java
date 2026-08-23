package com.project2.backend.template;

import java.util.List;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.project2.backend.user.User;
import com.project2.backend.user.UserRepository;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;
    private final UserRepository userRepository;

    public TemplateService(TemplateRepository templateRepository, UserRepository userRepository) {
        this.templateRepository = templateRepository;
        this.userRepository = userRepository;
    }

    public List<TemplateResponse> findAll(String email) {
        User user = getUser(email);
        return templateRepository.findAllByOwnerIdOrderByUpdatedAtDesc(user.getId()).stream()
                .map(TemplateResponse::from)
                .toList();
    }

    public TemplateResponse findById(Long id, String email) {
        return TemplateResponse.from(getOwnedTemplate(id, email));
    }

    public TemplateResponse create(TemplateRequest request, String email) {
        Template template = new Template(request.name().trim(), request.category().trim(), request.description(), request.fields(), "not-uploaded", "application/octet-stream", new byte[0], getUser(email));
        return TemplateResponse.from(templateRepository.save(template));
    }

    public TemplateResponse create(TemplateRequest request, MultipartFile file, String email) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "An empty form file is required");
        }
        try {
            String fileName = file.getOriginalFilename() == null ? "empty-form" : file.getOriginalFilename();
            String contentType = file.getContentType() == null ? "application/octet-stream" : file.getContentType();
            Template template = new Template(request.name().trim(), request.category().trim(), request.description(), request.fields(), fileName, contentType, file.getBytes(), getUser(email));
            return TemplateResponse.from(templateRepository.save(template));
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to read empty form", exception);
        }
    }

    public TemplateResponse update(Long id, TemplateRequest request, String email) {
        Template template = getOwnedTemplate(id, email);
        template.update(request.name().trim(), request.category().trim(), request.description(), request.fields(), request.status());
        return TemplateResponse.from(templateRepository.save(template));
    }

    public void delete(Long id, String email) {
        templateRepository.delete(getOwnedTemplate(id, email));
    }

    public TemplateResponse detect(Long id, String email) {
        Template template = getOwnedTemplate(id, email);
        if (template.getFields().equals("[]")) {
            template.update(template.getName(), template.getCategory(), template.getDescription(),
                    "[{\"id\":1,\"name\":\"Name\",\"type\":\"Text\",\"x\":18,\"y\":14,\"width\":36,\"height\":8}]", "Detected");
        } else {
            template.markDetected();
        }
        return TemplateResponse.from(templateRepository.save(template));
    }

    public TemplateResponse verify(Long id, TemplateRequest request, String email) {
        Template template = getOwnedTemplate(id, email);
        template.update(request.name().trim(), request.category().trim(), request.description(), request.fields(), "Verified");
        return TemplateResponse.from(templateRepository.save(template));
    }

    public TemplateResponse ready(Long id, String email) {
        Template template = getOwnedTemplate(id, email);
        template.markReady();
        return TemplateResponse.from(templateRepository.save(template));
    }

    public Template getFile(Long id, String email) {
        return getOwnedTemplate(id, email);
    }

    private Template getOwnedTemplate(Long id, String email) {
        User user = getUser(email);
        return templateRepository.findByIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Template not found"));
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
