package com.project2.backend.template;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public List<TemplateResponse> findAll(Authentication authentication) {
        return templateService.findAll(authentication.getName());
    }

    @GetMapping("/{id}")
    public TemplateResponse findById(@PathVariable Long id, Authentication authentication) {
        return templateService.findById(id, authentication.getName());
    }

    @PostMapping
    public ResponseEntity<TemplateResponse> create(@Valid @RequestBody TemplateRequest request, Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(templateService.create(request, authentication.getName()));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TemplateResponse> createWithFile(
            @Valid @RequestPart("metadata") TemplateRequest request,
            @RequestPart("file") MultipartFile file,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED).body(templateService.create(request, file, authentication.getName()));
    }

    @PutMapping("/{id}")
    public TemplateResponse update(@PathVariable Long id, @Valid @RequestBody TemplateRequest request, Authentication authentication) {
        return templateService.update(id, request, authentication.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        templateService.delete(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/detect")
    public TemplateResponse detect(@PathVariable Long id, Authentication authentication) {
        return templateService.detect(id, authentication.getName());
    }

    @PutMapping("/{id}/verify")
    public TemplateResponse verify(@PathVariable Long id, @Valid @RequestBody TemplateRequest request, Authentication authentication) {
        return templateService.verify(id, request, authentication.getName());
    }

    @PostMapping("/{id}/ready")
    public TemplateResponse ready(@PathVariable Long id, Authentication authentication) {
        return templateService.ready(id, authentication.getName());
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> file(@PathVariable Long id, Authentication authentication) {
        Template template = templateService.getFile(id, authentication.getName());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + template.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(template.getContentType()))
                .body(template.getFileContent());
    }
}
