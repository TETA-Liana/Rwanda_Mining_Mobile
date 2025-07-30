package com.mobile_app.check_in_system.repository;

import com.mobile_app.check_in_system.model.ExhibitorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExhibitorRequestRepository extends JpaRepository<ExhibitorRequest, Long> {
    
    // Find all granted exhibitors
    List<ExhibitorRequest> findByStatusOrderByGrantedAtDesc(String status);
    
    // Find granted exhibitors by event
    List<ExhibitorRequest> findByStatusAndEventOrderByGrantedAtDesc(String status, String event);
    
    // Search granted exhibitors by name, company, email, or exhibiting details
    @Query("SELECT e FROM ExhibitorRequest e WHERE e.status = 'GRANTED' AND " +
           "(LOWER(e.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.companyName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.exhibitingDetails) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "ORDER BY e.grantedAt DESC")
    List<ExhibitorRequest> searchGrantedExhibitors(@Param("searchTerm") String searchTerm);
    
    // Count granted exhibitors
    long countByStatus(String status);
} 