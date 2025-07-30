package com.mobile_app.check_in_system.service;

import com.mobile_app.check_in_system.dto.ExhibitorDto;
import com.mobile_app.check_in_system.model.ExhibitorRequest;
import com.mobile_app.check_in_system.repository.ExhibitorRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExhibitorService {

    @Autowired
    private ExhibitorRequestRepository exhibitorRequestRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<ExhibitorDto> getAllGrantedExhibitors() {
        List<ExhibitorRequest> exhibitors = exhibitorRequestRepository.findByStatusOrderByGrantedAtDesc("GRANTED");
        return exhibitors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<ExhibitorDto> searchGrantedExhibitors(String searchTerm) {
        List<ExhibitorRequest> exhibitors = exhibitorRequestRepository.searchGrantedExhibitors(searchTerm);
        return exhibitors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public long getGrantedExhibitorsCount() {
        return exhibitorRequestRepository.countByStatus("GRANTED");
    }

    private ExhibitorDto convertToDto(ExhibitorRequest exhibitor) {
        return new ExhibitorDto(
                "EXH" + String.format("%03d", exhibitor.getId()),
                exhibitor.getFullName(),
                exhibitor.getCompanyName(),
                exhibitor.getEmail(),
                exhibitor.getFullPhoneNumber(),
                "eligible",
                generateBoothNumber(exhibitor.getId()),
                exhibitor.getGrantedAt() != null ? 
                    exhibitor.getGrantedAt().format(DATE_FORMATTER) : 
                    exhibitor.getCreatedAt().format(DATE_FORMATTER)
        );
    }

    private String generateBoothNumber(Long id) {
        // Generate booth number based on ID
        // You can modify this logic based on your booth assignment strategy
        int boothNum = (int) (id % 26); // A-Z
        int section = (int) (id / 26) + 1; // 1, 2, 3, etc.
        char boothLetter = (char) ('A' + boothNum);
        return boothLetter + String.valueOf(section);
    }
} 