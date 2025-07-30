package com.mobile_app.check_in_system.repository;

import com.mobile_app.check_in_system.model.SponsorRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SponsorRequestRepository extends JpaRepository<SponsorRequest, Long> {
    
    // Find all granted sponsors
    List<SponsorRequest> findByStatusOrderByGrantedAtDesc(String status);
    
    // Find granted sponsors by event
    List<SponsorRequest> findByStatusAndEventOrderByGrantedAtDesc(String status, String event);
    
    // Find granted sponsors by budget level (sponsorship level)
    List<SponsorRequest> findByStatusAndSponsorBudgetOrderByGrantedAtDesc(String status, String sponsorBudget);
    
    // Search granted sponsors by name, company, email, or budget
    @Query("SELECT s FROM SponsorRequest s WHERE s.status = 'GRANTED' AND " +
           "(LOWER(s.sponsorName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.sponsorCompany) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.sponsorEmail) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.sponsorBudget) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "ORDER BY s.grantedAt DESC")
    List<SponsorRequest> searchGrantedSponsors(@Param("searchTerm") String searchTerm);
    
    // Count granted sponsors
    long countByStatus(String status);
    
    // Count granted sponsors by budget level
    long countByStatusAndSponsorBudget(String status, String sponsorBudget);
} 