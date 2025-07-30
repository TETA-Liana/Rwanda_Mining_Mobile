package com.mobile_app.check_in_system.service;

import com.mobile_app.check_in_system.dto.AttendeeDto;
import com.mobile_app.check_in_system.model.AttendeeRequest;
import com.mobile_app.check_in_system.repository.AttendeeRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AttendeeService {

    @Autowired
    private AttendeeRequestRepository attendeeRequestRepository;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public List<AttendeeDto> getAllGrantedAttendees() {
        List<AttendeeRequest> attendees = attendeeRequestRepository.findByStatusOrderByGrantedAtDesc("GRANTED");
        return attendees.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<AttendeeDto> searchGrantedAttendees(String searchTerm) {
        List<AttendeeRequest> attendees = attendeeRequestRepository.searchGrantedAttendees(searchTerm);
        return attendees.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public long getGrantedAttendeesCount() {
        return attendeeRequestRepository.countByStatus("GRANTED");
    }

    private AttendeeDto convertToDto(AttendeeRequest attendee) {
        return new AttendeeDto(
                "ATT" + String.format("%03d", attendee.getId()),
                attendee.getFullName(),
                attendee.getCompanyName(),
                attendee.getEmail(),
                attendee.getFullPhoneNumber(),
                "eligible",
                attendee.getGrantedAt() != null ? 
                    attendee.getGrantedAt().format(DATE_FORMATTER) : 
                    attendee.getCreatedAt().format(DATE_FORMATTER)
        );
    }
} 