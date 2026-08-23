package com.project2.backend.document;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/documents")
@Validated
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @GetMapping
    public List<DocumentResponse> findAll(Authentication authentication) {
        return documentService.findAll(authentication.getName());
    }

    @GetMapping("/{id}")
    public DocumentResponse findById(@PathVariable Long id, Authentication authentication) {
        return documentService.findById(id, authentication.getName());
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<DocumentResponse> upload(
            @Valid @RequestPart("metadata") DocumentRequest request,
            @RequestPart("file") MultipartFile file,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(documentService.upload(request, file, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication authentication) {
        documentService.delete(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<byte[]> file(@PathVariable Long id, Authentication authentication) {
        Document document = documentService.getFile(id, authentication.getName());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + document.getFileName() + "\"")
                .contentType(MediaType.parseMediaType(document.getContentType()))
                .body(document.getFileContent());
    }

    @PostMapping("/{id}/align")
    public DocumentResponse align(@PathVariable Long id, Authentication authentication) {
        return documentService.align(id, authentication.getName());
    }

    @PostMapping("/{id}/extract")
    public DocumentResponse extract(@PathVariable Long id, Authentication authentication) {
        return documentService.extract(id, authentication.getName());
    }

    @PostMapping("/{id}/verify")
    public DocumentResponse verify(@PathVariable Long id, Authentication authentication) {
        return documentService.verify(id, authentication.getName());
    }

    @PostMapping("/{id}/finalize")
    public DocumentResponse finalizeDocument(@PathVariable Long id, Authentication authentication) {
        return documentService.finalizeDocument(id, authentication.getName());
    }
}
