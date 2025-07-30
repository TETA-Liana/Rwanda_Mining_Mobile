package com.mobile_app.check_in_system.controller;

import com.mobile_app.check_in_system.dto.ExhibitorDto;
import com.mobile_app.check_in_system.service.ExhibitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exhibitors")
@CrossOrigin(origins = "*")
public class ExhibitorController {

    @Autowired
    private ExhibitorService exhibitorService;

    @GetMapping
    public ResponseEntity<List<ExhibitorDto>> getAllExhibitors() {
        try {
            List<ExhibitorDto> exhibitors = exhibitorService.getAllGrantedExhibitors();
            return ResponseEntity.ok(exhibitors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ExhibitorDto>> searchExhibitors(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity.ok(exhibitorService.getAllGrantedExhibitors());
            }
            List<ExhibitorDto> exhibitors = exhibitorService.searchGrantedExhibitors(query.trim());
            return ResponseEntity.ok(exhibitors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getExhibitorsCount() {
        try {
            long count = exhibitorService.getGrantedExhibitorsCount();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 