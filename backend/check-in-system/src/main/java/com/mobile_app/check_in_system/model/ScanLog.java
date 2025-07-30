package com.mobile_app.check_in_system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scan_log")
public class ScanLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String scannedId;
    private String role; // Attendee, Sponsor, Exhibitor, Unknown
    private Long matchedRecordId; // nullable
    private String status; // GRANTED, DENIED, NOT_FOUND, etc.
    private Boolean valid;
    private LocalDateTime timestamp;
    private String rawContent;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getScannedId() { return scannedId; }
    public void setScannedId(String scannedId) { this.scannedId = scannedId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Long getMatchedRecordId() { return matchedRecordId; }
    public void setMatchedRecordId(Long matchedRecordId) { this.matchedRecordId = matchedRecordId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getValid() { return valid; }
    public void setValid(Boolean valid) { this.valid = valid; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getRawContent() { return rawContent; }
    public void setRawContent(String rawContent) { this.rawContent = rawContent; }
}