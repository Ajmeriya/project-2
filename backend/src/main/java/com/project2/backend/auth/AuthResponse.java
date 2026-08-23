package com.project2.backend.auth;

public record AuthResponse(String token, Long userId, String email, String fullName) {
}
