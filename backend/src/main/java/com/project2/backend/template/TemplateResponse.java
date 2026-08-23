package com.project2.backend.template;

import java.time.Instant;

public record TemplateResponse(
        Long id,
        String name,
        String category,
        String description,
        String status,
        String version,
        String fields,
        Instant updatedAt,
        String fileName) {

    static TemplateResponse from(Template template) {
        return new TemplateResponse(
                template.getId(), template.getName(), template.getCategory(), template.getDescription(),
                template.getStatus(), template.getVersion(), template.getFields(), template.getUpdatedAt(), template.getFileName());
    }
}
