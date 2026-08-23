package com.project2.backend.template;

import java.time.Instant;

import com.project2.backend.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "templates")
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false, length = 30)
    private String status = "Draft";

    @Column(nullable = false, length = 30)
    private String version = "v1.0";

    @Column(nullable = false, columnDefinition = "json")
    private String fields = "[]";

    @Column(length = 255)
    private String fileName;

    @Column(length = 100)
    private String contentType;

    @Column(columnDefinition = "LONGBLOB")
    private byte[] fileContent;

    @Column(nullable = false)
    private Instant updatedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    protected Template() {
    }

    public Template(String name, String category, String description, String fields, String fileName, String contentType, byte[] fileContent, User owner) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.fields = fields == null ? "[]" : fields;
        this.fileName = fileName;
        this.contentType = contentType;
        this.fileContent = fileContent;
        this.owner = owner;
    }

    @PrePersist
    @PreUpdate
    void updateTimestamp() {
        updatedAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public String getStatus() { return status; }
    public String getVersion() { return version; }
    public String getFields() { return fields; }
    public Instant getUpdatedAt() { return updatedAt; }
    public User getOwner() { return owner; }
    public String getFileName() { return fileName; }
    public String getContentType() { return contentType; }
    public byte[] getFileContent() { return fileContent; }

    public void markDetected() { this.status = "Detected"; }
    public void markVerified() { this.status = "Verified"; }
    public void markReady() { this.status = "Ready"; }

    public void update(String name, String category, String description, String fields, String status) {
        this.name = name;
        this.category = category;
        this.description = description;
        this.fields = fields == null ? "[]" : fields;
        this.status = status == null || status.isBlank() ? "Draft" : status;
    }
}
