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

        // Try Attendee
        Optional<AttendeeRequest> attendeeOpt = attendeeRequestRepository.findById(parseId(scannedId, "ATT"));
        if (attendeeOpt.isPresent()) {
            AttendeeRequest attendee = attendeeOpt.get();
            log.setRole("Attendee");
            log.setMatchedRecordId(attendee.getId());
            if ("GRANTED".equalsIgnoreCase(attendee.getStatus())) {
                log.setStatus("GRANTED");
                log.setValid(true);
            } else {
                log.setStatus(attendee.getStatus());
            }
            scanLogRepository.save(log);
            return toDto(log);
        }
        // Try Sponsor
        Optional<SponsorRequest> sponsorOpt = sponsorRequestRepository.findById(parseId(scannedId, "SPO"));
        if (sponsorOpt.isPresent()) {
            SponsorRequest sponsor = sponsorOpt.get();
            log.setRole("Sponsor");
            log.setMatchedRecordId(sponsor.getId());
            if ("GRANTED".equalsIgnoreCase(sponsor.getStatus())) {
                log.setStatus("GRANTED");
                log.setValid(true);
            } else {
                log.setStatus(sponsor.getStatus());
            }
            scanLogRepository.save(log);
            return toDto(log);
        }
        // Try Exhibitor
        Optional<ExhibitorRequest> exhibitorOpt = exhibitorRequestRepository.findById(parseId(scannedId, "EXH"));
        if (exhibitorOpt.isPresent()) {
            ExhibitorRequest exhibitor = exhibitorOpt.get();
            log.setRole("Exhibitor");
            log.setMatchedRecordId(exhibitor.getId());
            if ("GRANTED".equalsIgnoreCase(exhibitor.getStatus())) {
                log.setStatus("GRANTED");
                log.setValid(true);
            } else {
                log.setStatus(exhibitor.getStatus());
            }
            scanLogRepository.save(log);
            return toDto(log);
        }
        // Not found
        scanLogRepository.save(log);
        return toDto(log);
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

    private Long parseId(String scannedId, String prefix) {
        try {
            if (scannedId != null && scannedId.startsWith(prefix)) {
                return Long.parseLong(scannedId.substring(prefix.length()));
            }
        } catch (Exception ignored) {}
        return -1L;
    }

    private ScanLogDto toDto(ScanLog log) {
        String name = null, company = null, email = null, phone = null, sponsorshipLevel = null, boothNumber = null, registrationDate = null;
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
                boothNumber = exhibitor.getBoothNumber();
                registrationDate = exhibitor.getGrantedAt() != null ? exhibitor.getGrantedAt().toLocalDate().toString() : null;
            }
        }
        new ScanLogDto(
                log.getId(),
                log.getScannedId(),
                log.getRole(),
                log.getMatchedRecordId(),
                log.getStatus(),
                log.getValid(),
                log.getTimestamp(),
                log.getRawContent(),
                name, company, email, phone, sponsorshipLevel, boothNumber, registrationDate
        );
    }
}