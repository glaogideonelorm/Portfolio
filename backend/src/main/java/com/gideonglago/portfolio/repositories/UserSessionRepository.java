package com.gideonglago.portfolio.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gideonglago.portfolio.models.UserSession;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, Long> {
    
    Optional<UserSession> findBySessionId(String sessionId);
    
    List<UserSession> findByIpAddress(String ipAddress);
    
    List<UserSession> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT AVG(us.totalDuration) FROM UserSession us WHERE us.totalDuration IS NOT NULL AND us.startTime >= :start")
    Double getAverageSessionDurationSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT AVG(us.pageViews) FROM UserSession us WHERE us.startTime >= :start")
    Double getAveragePageViewsPerSessionSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT us.entryPage, COUNT(us) FROM UserSession us WHERE us.startTime >= :start GROUP BY us.entryPage ORDER BY COUNT(us) DESC")
    List<Object[]> findMostCommonEntryPagesSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT us.exitPage, COUNT(us) FROM UserSession us WHERE us.exitPage IS NOT NULL AND us.startTime >= :start GROUP BY us.exitPage ORDER BY COUNT(us) DESC")
    List<Object[]> findMostCommonExitPagesSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT COUNT(us) FROM UserSession us WHERE us.isReturningVisitor = true AND us.startTime >= :start")
    Long countReturningVisitorsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT COUNT(us) FROM UserSession us WHERE us.isReturningVisitor = false AND us.startTime >= :start")
    Long countNewVisitorsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT us.referrer, COUNT(us) FROM UserSession us WHERE us.referrer IS NOT NULL AND us.referrer != '' AND us.startTime >= :start GROUP BY us.referrer ORDER BY COUNT(us) DESC")
    List<Object[]> findTopReferrersSince(@Param("start") LocalDateTime start);
} 