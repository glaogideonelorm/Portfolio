package com.gideonglago.portfolio.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gideonglago.portfolio.models.ClickEvent;

@Repository
public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {
    
    List<ClickEvent> findBySessionId(String sessionId);
    
    List<ClickEvent> findByPage(String page);
    
    List<ClickEvent> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT ce.elementType, COUNT(ce) FROM ClickEvent ce WHERE ce.timestamp >= :start GROUP BY ce.elementType ORDER BY COUNT(ce) DESC")
    List<Object[]> findMostClickedElementTypesSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT ce.elementId, ce.elementText, COUNT(ce) FROM ClickEvent ce WHERE ce.timestamp >= :start AND ce.elementId IS NOT NULL GROUP BY ce.elementId, ce.elementText ORDER BY COUNT(ce) DESC")
    List<Object[]> findMostClickedElementsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT ce.page, COUNT(ce) FROM ClickEvent ce WHERE ce.timestamp >= :start GROUP BY ce.page ORDER BY COUNT(ce) DESC")
    List<Object[]> findMostClickedPagesSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT COUNT(ce) FROM ClickEvent ce WHERE ce.timestamp >= :start")
    Long countClicksSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT ce.targetUrl, COUNT(ce) FROM ClickEvent ce WHERE ce.targetUrl IS NOT NULL AND ce.timestamp >= :start GROUP BY ce.targetUrl ORDER BY COUNT(ce) DESC")
    List<Object[]> findMostClickedLinksSince(@Param("start") LocalDateTime start);
} 