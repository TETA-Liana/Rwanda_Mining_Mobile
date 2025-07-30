package com.mobile_app.check_in_system.repository;

import com.mobile_app.check_in_system.model.AttendeeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendeeRequestRepository extends JpaRepository<AttendeeRequest, Long> {
    
    // Find all granted attendees
    List<AttendeeRequest> findByStatusOrderByGrantedAtDesc(String status);
    
    // Find granted attendees by event
    List<AttendeeRequest> findByStatusAndEventOrderByGrantedAtDesc(String status, String event);
    
    // Search granted attendees by name, company, or email
    @Query("SELECT a FROM AttendeeRequest a WHERE a.status = 'GRANTED' AND " +
           "(LOWER(a.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.companyName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "ORDER BY a.grantedAt DESC")
    List<AttendeeRequest> searchGrantedAttendees(@Param("searchTerm") String searchTerm);
    
    // Count granted attendees
    long countByStatus(String status);
    
    // Find by first name (case insensitive)
    Optional<AttendeeRequest> findByFirstNameIgnoreCase(String firstName);
} 