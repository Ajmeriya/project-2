package com.project2.backend.document;

import java.util.List;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.project2.backend.user.User;
import com.project2.backend.user.UserRepository;

@Service
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    public DocumentService(DocumentRepository documentRepository, UserRepository userRepository) {
        this.documentRepository = documentRepository;
        this.userRepository = userRepository;
    }

    public List<DocumentResponse> findAll(String email) {
        User user = getUser(email);
        return documentRepository.findAllByOwnerIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(DocumentResponse::from)
                .toList();
    }

    public DocumentResponse findById(Long id, String email) {
        return DocumentResponse.from(getOwnedDocument(id, email));
    }

    public DocumentResponse upload(DocumentRequest request, MultipartFile file, String email) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A document file is required");
        }

        User user = getUser(email);
        String documentNumber = String.format("DOC-%04d", documentRepository.countByOwnerId(user.getId()) + 1001);
        try {
            Document document = new Document(documentNumber, request.formName().trim(), request.customer().trim(),
                    file.getOriginalFilename() == null ? "uploaded-file" : file.getOriginalFilename(), file.getSize(), file.getBytes(),
                    file.getContentType() == null ? "application/octet-stream" : file.getContentType(), user);
            return DocumentResponse.from(documentRepository.save(document));
        } catch (IOException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable to read uploaded document", exception);
        }
    }

    public void delete(Long id, String email) {
        documentRepository.delete(getOwnedDocument(id, email));
    }

    public DocumentResponse align(Long id, String email) {
        Document document = getOwnedDocument(id, email);
        document.markAligned();
        return DocumentResponse.from(documentRepository.save(document));
    }

    public DocumentResponse extract(Long id, String email) {
        Document document = getOwnedDocument(id, email);
        document.markExtracted();
        return DocumentResponse.from(documentRepository.save(document));
    }

    public DocumentResponse verify(Long id, String email) {
        Document document = getOwnedDocument(id, email);
        document.markVerified();
        return DocumentResponse.from(documentRepository.save(document));
    }

    public DocumentResponse finalizeDocument(Long id, String email) {
        Document document = getOwnedDocument(id, email);
        document.markFinalSaved();
        return DocumentResponse.from(documentRepository.save(document));
    }

    public Document getFile(Long id, String email) {
        return getOwnedDocument(id, email);
    }

    private Document getOwnedDocument(Long id, String email) {
        User user = getUser(email);
        return documentRepository.findByIdAndOwnerId(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Document not found"));
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }
}
