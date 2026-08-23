package com.project2.backend.document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record DocumentRequest(
        @NotBlank @Size(max = 150) String formName,
        @NotBlank @Size(max = 150) String customer) {
}
