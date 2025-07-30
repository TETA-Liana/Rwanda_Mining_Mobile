package com.mobile_app.check_in_system.dto;

public class ExhibitorDto {
    private String id;
    private String name;
    private String company;
    private String email;
    private String phone;
    private String status;
    private String boothNumber;
    private String registrationDate;

    public ExhibitorDto() {}

    public ExhibitorDto(String id, String name, String company, String email, String phone, String status, String boothNumber, String registrationDate) {
        this.id = id;
        this.name = name;
        this.company = company;
        this.email = email;
        this.phone = phone;
        this.status = status;
        this.boothNumber = boothNumber;
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

    public String getBoothNumber() {
        return boothNumber;
    }

    public void setBoothNumber(String boothNumber) {
        this.boothNumber = boothNumber;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }
} 