package com.mobile_app.check_in_system.service;

import com.mobile_app.check_in_system.dto.SponsorDto;
import com.mobile_app.check_in_system.model.SponsorRequest;
import com.mobile_app.check_in_system.repository.SponsorRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SponsorService {

    @Autowired
    private SponsorRequestRepository sponsorRequestRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<SponsorDto> getAllGrantedSponsors() {
        List<SponsorRequest> sponsors = sponsorRequestRepository.findByStatusOrderByGrantedAtDesc("GRANTED");
        return sponsors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SponsorDto> getGrantedSponsorsByLevel(String sponsorshipLevel) {
        List<SponsorRequest> sponsors = sponsorRequestRepository.findByStatusAndSponsorBudgetOrderByGrantedAtDesc("GRANTED", sponsorshipLevel);
        return sponsors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<SponsorDto> searchGrantedSponsors(String searchTerm) {
        List<SponsorRequest> sponsors = sponsorRequestRepository.searchGrantedSponsors(searchTerm);
        return sponsors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public long getGrantedSponsorsCount() {
        return sponsorRequestRepository.countByStatus("GRANTED");
    }

    public long getGrantedSponsorsCountByLevel(String sponsorshipLevel) {
        return sponsorRequestRepository.countByStatusAndSponsorBudget("GRANTED", sponsorshipLevel);
    }

    private SponsorDto convertToDto(SponsorRequest sponsor) {
        return new SponsorDto(
                "SPO" + String.format("%03d", sponsor.getId()),
                sponsor.getSponsorName(),
                sponsor.getSponsorCompany(),
                sponsor.getSponsorEmail(),
                sponsor.getFullPhoneNumber(),
                "eligible",
                sponsor.getSponsorBudget(),
                sponsor.getGrantedAt() != null ? 
                    sponsor.getGrantedAt().format(DATE_FORMATTER) : 
                    sponsor.getCreatedAt().format(DATE_FORMATTER)
        );
    }
} 