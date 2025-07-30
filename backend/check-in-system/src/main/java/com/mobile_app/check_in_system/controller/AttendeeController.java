package com.mobile_app.check_in_system.controller;

import com.mobile_app.check_in_system.dto.AttendeeDto;
import com.mobile_app.check_in_system.service.AttendeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendees")
@CrossOrigin(origins = "*")
public class AttendeeController {

    @Autowired
    private AttendeeService attendeeService;

    @GetMapping
    public ResponseEntity<List<AttendeeDto>> getAllAttendees() {
        try {
            List<AttendeeDto> attendees = attendeeService.getAllGrantedAttendees();
            return ResponseEntity.ok(attendees);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<AttendeeDto>> searchAttendees(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity.ok(attendeeService.getAllGrantedAttendees());
            }
            List<AttendeeDto> attendees = attendeeService.searchGrantedAttendees(query.trim());
            return ResponseEntity.ok(attendees);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getAttendeesCount() {
        try {
            long count = attendeeService.getGrantedAttendeesCount();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 