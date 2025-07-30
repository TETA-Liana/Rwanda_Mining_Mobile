package com.mobile_app.check_in_system.dto;

public class SponsorDto {
    private String id;
    private String name;
    private String company;
    private String email;
    private String phone;
    private String status;
    private String sponsorshipLevel;
    private String registrationDate;

    public SponsorDto() {}

    public SponsorDto(String id, String name, String company, String email, String phone, String status, String sponsorshipLevel, String registrationDate) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.sponsorshipLevel = sponsorshipLevel;
        this.registrationDate = registrationDate;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSponsorshipLevel() {
        return sponsorshipLevel;
    }

    public void setSponsorshipLevel(String sponsorshipLevel) {
        this.sponsorshipLevel = sponsorshipLevel;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }
} 