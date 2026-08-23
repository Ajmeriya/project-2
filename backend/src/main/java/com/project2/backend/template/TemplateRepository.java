package com.project2.backend.template;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TemplateRepository extends JpaRepository<Template, Long> {

    List<Template> findAllByOwnerIdOrderByUpdatedAtDesc(Long ownerId);

    Optional<Template> findByIdAndOwnerId(Long id, Long ownerId);
}
