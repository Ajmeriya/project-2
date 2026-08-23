package com.project2.backend.template;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record TemplateRequest(
        @NotBlank @Size(max = 150) String name,
        @NotBlank @Size(max = 100) String category,
        @Size(max = 1000) String description,
        String fields,
        String status) {
}
