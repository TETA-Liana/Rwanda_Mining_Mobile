package com.mobile_app.check_in_system.controller;

import com.mobile_app.check_in_system.dto.SponsorDto;
import com.mobile_app.check_in_system.service.SponsorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sponsors")
@CrossOrigin(origins = "*")
public class SponsorController {

    @Autowired
    private SponsorService sponsorService;

    @GetMapping
    public ResponseEntity<List<SponsorDto>> getAllSponsors() {
        try {
            List<SponsorDto> sponsors = sponsorService.getAllGrantedSponsors();
            return ResponseEntity.ok(sponsors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<SponsorDto>> getSponsorsByLevel(@PathVariable String level) {
        try {
            List<SponsorDto> sponsors = sponsorService.getGrantedSponsorsByLevel(level);
            return ResponseEntity.ok(sponsors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<SponsorDto>> searchSponsors(@RequestParam String query) {
        try {
            if (query == null || query.trim().isEmpty()) {
                return ResponseEntity.ok(sponsorService.getAllGrantedSponsors());
            }
            List<SponsorDto> sponsors = sponsorService.searchGrantedSponsors(query.trim());
            return ResponseEntity.ok(sponsors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getSponsorsCount() {
        try {
            long count = sponsorService.getGrantedSponsorsCount();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/count/level/{level}")
    public ResponseEntity<Long> getSponsorsCountByLevel(@PathVariable String level) {
        try {
            long count = sponsorService.getGrantedSponsorsCountByLevel(level);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
} 