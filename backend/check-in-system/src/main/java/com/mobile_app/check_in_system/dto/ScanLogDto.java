package com.mobile_app.check_in_system.dto;

import java.time.LocalDateTime;

public class ScanLogDto {
    private Long id;
    private String scannedId;
    private String role;
    private Long matchedRecordId;
    private String status;
    private Boolean valid;
    private LocalDateTime timestamp;
    private String rawContent;

    // New fields for richer scan results
    private String name;
    private String company;
    private String email;
    private String phone;
    private String sponsorshipLevel;
    private String boothNumber;
    private String registrationDate;

    public ScanLogDto() {}

    public ScanLogDto(Long id, String scannedId, String role, Long matchedRecordId, String status, Boolean valid, LocalDateTime timestamp, String rawContent,
                      String name, String company, String email, String phone, String sponsorshipLevel, String boothNumber, String registrationDate) {
        this.id = id;
        this.scannedId = scannedId;
        this.role = role;
        this.matchedRecordId = matchedRecordId;
        this.status = status;
        this.valid = valid;
        this.timestamp = timestamp;
        this.rawContent = rawContent;
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
        this.sponsorshipLevel = sponsorshipLevel;
        this.boothNumber = boothNumber;
        this.registrationDate = registrationDate;
    }

    // Getters and setters for all fields
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

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getSponsorshipLevel() { return sponsorshipLevel; }
    public void setSponsorshipLevel(String sponsorshipLevel) { this.sponsorshipLevel = sponsorshipLevel; }

    public String getBoothNumber() { return boothNumber; }
    public void setBoothNumber(String boothNumber) { this.boothNumber = boothNumber; }

    public String getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(String registrationDate) { this.registrationDate = registrationDate; }
}