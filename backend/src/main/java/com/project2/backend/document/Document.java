package com.project2.backend.document;

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
import jakarta.persistence.Table;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String documentNumber;

    @Column(nullable = false, length = 150)
    private String formName;

    @Column(nullable = false, length = 150)
    private String customer;

    @Column(nullable = false, length = 30)
    private String status = "Queued";

    @Column(nullable = false)
    private Integer confidence = 0;

    @Column(nullable = false, length = 255)
    private String fileName;

    @Column(nullable = false)
    private Long fileSize;

    @Column(nullable = false, columnDefinition = "LONGBLOB")
    private byte[] fileContent;

    @Column(nullable = false, length = 100)
    private String contentType;

    @Column(nullable = false, columnDefinition = "json")
    private String extractedData = "{}";

    @Column(nullable = false)
    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    protected Document() {
    }

    public Document(String documentNumber, String formName, String customer, String fileName, Long fileSize, byte[] fileContent, String contentType, User owner) {
        this.documentNumber = documentNumber;
        this.formName = formName;
        this.customer = customer;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileContent = fileContent;
        this.contentType = contentType;
        this.owner = owner;
    }

    @PrePersist
    void setCreatedAt() {
        createdAt = Instant.now();
    }

    public Long getId() { return id; }
    public String getDocumentNumber() { return documentNumber; }
    public String getFormName() { return formName; }
    public String getCustomer() { return customer; }
    public String getStatus() { return status; }
    public Integer getConfidence() { return confidence; }
    public String getFileName() { return fileName; }
    public Long getFileSize() { return fileSize; }
    public Instant getCreatedAt() { return createdAt; }
    public User getOwner() { return owner; }
    public byte[] getFileContent() { return fileContent; }
    public String getContentType() { return contentType; }
    public String getExtractedData() { return extractedData; }
    public void markAligned() { this.status = "Aligned"; }
    public void markExtracted() { this.status = "Extracted"; this.confidence = 85; this.extractedData = "{}"; }
    public void markVerified() { this.status = "Verified"; }
    public void markFinalSaved() { this.status = "Final Saved"; }
}
