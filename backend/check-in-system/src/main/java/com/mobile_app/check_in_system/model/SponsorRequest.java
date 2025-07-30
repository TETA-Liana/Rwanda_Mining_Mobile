package com.mobile_app.check_in_system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sponsor_request")
public class SponsorRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sponsor_name")
    private String sponsorName;
    
    @Column(name = "sponsor_company")
    private String sponsorCompany;
    
    @Column(name = "sponsor_budget")
    private String sponsorBudget;
    
    @Column(name = "sponsor_email")
    private String sponsorEmail;
    
    @Column(name = "sponsor_phone_code")
    private String sponsorPhoneCode;
    
    @Column(name = "sponsor_phone")
    private String sponsorPhone;
    
    @Column(name = "sponsor_notes")
    private String sponsorNotes;
    
    private String event;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    private String status;
    
    @Column(name = "granted_at")
    private LocalDateTime grantedAt;

    // Constructors
    public SponsorRequest() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSponsorName() {
        return sponsorName;
    }

    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }

    public String getSponsorCompany() {
        return sponsorCompany;
    }

    public void setSponsorCompany(String sponsorCompany) {
        this.sponsorCompany = sponsorCompany;
    }

    public String getSponsorBudget() {
        return sponsorBudget;
    }

    public void setSponsorBudget(String sponsorBudget) {
        this.sponsorBudget = sponsorBudget;
    }

    public String getSponsorEmail() {
        return sponsorEmail;
    }

    public void setSponsorEmail(String sponsorEmail) {
        this.sponsorEmail = sponsorEmail;
    }

    public String getSponsorPhoneCode() {
        return sponsorPhoneCode;
    }

    public void setSponsorPhoneCode(String sponsorPhoneCode) {
        this.sponsorPhoneCode = sponsorPhoneCode;
    }

    public String getSponsorPhone() {
        return sponsorPhone;
    }

    public void setSponsorPhone(String sponsorPhone) {
        this.sponsorPhone = sponsorPhone;
    }

    public String getSponsorNotes() {
        return sponsorNotes;
    }

    public void setSponsorNotes(String sponsorNotes) {
        this.sponsorNotes = sponsorNotes;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getGrantedAt() {
        return grantedAt;
    }

    public void setGrantedAt(LocalDateTime grantedAt) {
        this.grantedAt = grantedAt;
    }

    // Helper method to get full phone number
    public String getFullPhoneNumber() {
        return sponsorPhoneCode + sponsorPhone;
    }
} 