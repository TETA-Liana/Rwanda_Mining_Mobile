package com.mobile_app.check_in_system.controller;

import com.mobile_app.check_in_system.dto.ScanLogDto;
import com.mobile_app.check_in_system.service.ScanLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scan")
@CrossOrigin(origins = "*")
public class ScanLogController {
    @Autowired
    private ScanLogService scanLogService;

    @PostMapping
    public ResponseEntity<ScanLogDto> scan(@RequestBody Map<String, String> payload) {
        String scannedId = payload.get("scannedId");
        String rawContent = payload.getOrDefault("rawContent", scannedId);
        ScanLogDto result = scanLogService.processScan(scannedId, rawContent);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<List<ScanLogDto>> getAllLogs() {
        // Return all logs, most recent first
        List<ScanLogDto> logs = scanLogService.getAllLogs();
        return ResponseEntity.ok(logs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ScanLogDto> getLogById(@PathVariable Long id) {
        ScanLogDto log = scanLogService.getLogById(id);
        if (log != null) {
            return ResponseEntity.ok(log);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<List<ScanLogDto>> getRecentLogs() {
        List<ScanLogDto> logs = scanLogService.getRecentLogs(20);
        return ResponseEntity.ok(logs);
    }
}