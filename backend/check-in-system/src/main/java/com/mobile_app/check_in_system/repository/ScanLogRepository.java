package com.mobile_app.check_in_system.repository;

import com.mobile_app.check_in_system.model.ScanLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScanLogRepository extends JpaRepository<ScanLog, Long> {
}