package com.mobile_app.check_in_system.service;

import com.mobile_app.check_in_system.dto.ScanLogDto;
import com.mobile_app.check_in_system.model.AttendeeRequest;
import com.mobile_app.check_in_system.model.ExhibitorRequest;
import com.mobile_app.check_in_system.model.SponsorRequest;
import com.mobile_app.check_in_system.model.ScanLog;
import com.mobile_app.check_in_system.repository.AttendeeRequestRepository;
import com.mobile_app.check_in_system.repository.ExhibitorRequestRepository;
import com.mobile_app.check_in_system.repository.SponsorRequestRepository;
import com.mobile_app.check_in_system.repository.ScanLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ScanLogService {
    @Autowired
    private ScanLogRepository scanLogRepository;
    @Autowired
    private AttendeeRequestRepository attendeeRequestRepository;
    @Autowired
    private SponsorRequestRepository sponsorRequestRepository;
    @Autowired
    private ExhibitorRequestRepository exhibitorRequestRepository;

    @Transactional
    public ScanLogDto processScan(String scannedId, String rawContent) {
        ScanLog log = new ScanLog();
        log.setScannedId(scannedId);
        log.setRawContent(rawContent);
        log.setValid(false);
        log.setStatus("NOT_FOUND");
        log.setRole("Unknown");
        log.setMatchedRecordId(null);

        // Parse the raw content to extract role and first name
        ParsedContent parsed = parseRawContent(rawContent);
        log.setRole(parsed.role);

        // Search for matching record based on role and first name
        if ("Exhibitor".equals(parsed.role) && parsed.firstName != null) {
            // Search in exhibitor_request table by first name
            Optional<ExhibitorRequest> exhibitorOpt = exhibitorRequestRepository.findByFirstNameIgnoreCase(parsed.firstName);
            if (exhibitorOpt.isPresent()) {
                ExhibitorRequest exhibitor = exhibitorOpt.get();
                log.setMatchedRecordId(exhibitor.getId());
                log.setStatus("FOUND");
                
                // Check if status is GRANTED
                if ("GRANTED".equalsIgnoreCase(exhibitor.getStatus())) {
                    log.setValid(true);
                } else {
                    log.setValid(false);
                }
            }
        } else if ("Sponsor".equals(parsed.role) && parsed.firstName != null) {
            // Search in sponsor_request table by sponsor name (assuming it contains first name)
            Optional<SponsorRequest> sponsorOpt = sponsorRequestRepository.findBySponsorNameContainingIgnoreCase(parsed.firstName);
            if (sponsorOpt.isPresent()) {
                SponsorRequest sponsor = sponsorOpt.get();
                log.setMatchedRecordId(sponsor.getId());
                log.setStatus("FOUND");
                
                // Check if status is GRANTED
                if ("GRANTED".equalsIgnoreCase(sponsor.getStatus())) {
                    log.setValid(true);
                } else {
                    log.setValid(false);
                }
            }
        } else if ("Attendee".equals(parsed.role) && parsed.firstName != null) {
            // Search in attendee_request table by first name
            Optional<AttendeeRequest> attendeeOpt = attendeeRequestRepository.findByFirstNameIgnoreCase(parsed.firstName);
            if (attendeeOpt.isPresent()) {
                AttendeeRequest attendee = attendeeOpt.get();
                log.setMatchedRecordId(attendee.getId());
                log.setStatus("FOUND");
                
                // Check if status is GRANTED
                if ("GRANTED".equalsIgnoreCase(attendee.getStatus())) {
                    log.setValid(true);
                } else {
                    log.setValid(false);
                }
            }
        }

        // Save the log
        scanLogRepository.save(log);
        return toDto(log);
    }

    private static class ParsedContent {
        String role;
        String firstName;
        
        ParsedContent(String role, String firstName) {
            this.role = role;
            this.firstName = firstName;
        }
    }

    private ParsedContent parseRawContent(String rawContent) {
        if (rawContent == null || rawContent.trim().isEmpty()) {
            return new ParsedContent("Unknown", null);
        }

        String content = rawContent.trim();
        
        // Extract role from badge type
        String role = "Unknown";
        if (content.toLowerCase().contains("exhibitor badge")) {
            role = "Exhibitor";
        } else if (content.toLowerCase().contains("sponsor badge")) {
            role = "Sponsor";
        } else if (content.toLowerCase().contains("attendee badge")) {
            role = "Attendee";
        }

        // Extract first name from "Badge: FirstName LastName" pattern
        String firstName = null;
        if (content.contains("Badge:")) {
            String badgePart = content.substring(content.indexOf("Badge:") + 6).trim();
            if (badgePart.contains(",")) {
                // Handle "FirstName LastName, Company" format
                String namePart = badgePart.substring(0, badgePart.indexOf(",")).trim();
                String[] nameParts = namePart.split("\\s+");
                if (nameParts.length > 0) {
                    firstName = nameParts[0];
                }
            } else {
                // Handle "FirstName LastName" format
                String[] nameParts = badgePart.split("\\s+");
                if (nameParts.length > 0) {
                    firstName = nameParts[0];
                }
            }
        }

        return new ParsedContent(role, firstName);
    }

    public List<ScanLogDto> getAllLogs() {
        return scanLogRepository.findAll().stream()
            .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
            .map(this::toDto)
            .toList();
    }

    public ScanLogDto getLogById(Long id) {
        return scanLogRepository.findById(id).map(this::toDto).orElse(null);
    }

    public List<ScanLogDto> getRecentLogs(int limit) {
        return scanLogRepository.findAll().stream()
            .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
            .limit(limit)
            .map(this::toDto)
            .toList();
    }



    private ScanLogDto toDto(ScanLog log) {
        String name = null, company = null, email = null, phone = null, sponsorshipLevel = null, registrationDate = null;
        if ("Attendee".equals(log.getRole()) && log.getMatchedRecordId() != null && log.getMatchedRecordId() > 0) {
            Optional<AttendeeRequest> attendeeOpt = attendeeRequestRepository.findById(log.getMatchedRecordId());
            if (attendeeOpt.isPresent()) {
                AttendeeRequest attendee = attendeeOpt.get();
                name = attendee.getFullName();
                company = attendee.getCompanyName();
                email = attendee.getEmail();
                phone = attendee.getFullPhoneNumber();
                registrationDate = attendee.getGrantedAt() != null ? attendee.getGrantedAt().toLocalDate().toString() : null;
            }
        } else if ("Sponsor".equals(log.getRole()) && log.getMatchedRecordId() != null && log.getMatchedRecordId() > 0) {
            Optional<SponsorRequest> sponsorOpt = sponsorRequestRepository.findById(log.getMatchedRecordId());
            if (sponsorOpt.isPresent()) {
                SponsorRequest sponsor = sponsorOpt.get();
                name = sponsor.getSponsorName();
                company = sponsor.getSponsorCompany();
                email = sponsor.getSponsorEmail();
                phone = sponsor.getFullPhoneNumber();
                sponsorshipLevel = sponsor.getSponsorBudget();
                registrationDate = sponsor.getGrantedAt() != null ? sponsor.getGrantedAt().toLocalDate().toString() : null;
            }
        } else if ("Exhibitor".equals(log.getRole()) && log.getMatchedRecordId() != null && log.getMatchedRecordId() > 0) {
            Optional<ExhibitorRequest> exhibitorOpt = exhibitorRequestRepository.findById(log.getMatchedRecordId());
            if (exhibitorOpt.isPresent()) {
                ExhibitorRequest exhibitor = exhibitorOpt.get();
                name = exhibitor.getFullName();
                company = exhibitor.getCompanyName();
                email = exhibitor.getEmail();
                phone = exhibitor.getFullPhoneNumber();
                registrationDate = exhibitor.getGrantedAt() != null ? exhibitor.getGrantedAt().toLocalDate().toString() : null;
            }
        }
        return new ScanLogDto(
                log.getId(),
                log.getScannedId(),
                log.getRole(),
                log.getMatchedRecordId(),
                log.getStatus(),
                log.getValid(),
                log.getTimestamp(),
                log.getRawContent(),
                name, company, email, phone, sponsorshipLevel, null, registrationDate
        );
    }
}