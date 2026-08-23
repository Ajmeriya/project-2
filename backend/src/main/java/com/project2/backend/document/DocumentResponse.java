package com.project2.backend.document;

import java.time.Instant;

public record DocumentResponse(
        Long id,
        String documentNumber,
        String formName,
        String customer,
        String status,
        Integer confidence,
        String fileName,
        Long fileSize,
        Instant createdAt,
        String extractedData) {

    static DocumentResponse from(Document document) {
        return new DocumentResponse(document.getId(), document.getDocumentNumber(), document.getFormName(),
                document.getCustomer(), document.getStatus(), document.getConfidence(), document.getFileName(),
                document.getFileSize(), document.getCreatedAt(), document.getExtractedData());
    }
}
