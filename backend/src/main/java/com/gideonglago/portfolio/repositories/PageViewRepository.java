package com.gideonglago.portfolio.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gideonglago.portfolio.models.PageView;

@Repository
public interface PageViewRepository extends JpaRepository<PageView, Long> {
    
    List<PageView> findBySessionId(String sessionId);
    
    List<PageView> findByPage(String page);
    
    List<PageView> findByTimestampBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT pv.page, COUNT(pv) FROM PageView pv WHERE pv.timestamp >= :start GROUP BY pv.page ORDER BY COUNT(pv) DESC")
    List<Object[]> findPopularPagesSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT COUNT(DISTINCT pv.sessionId) FROM PageView pv WHERE pv.timestamp >= :start")
    Long countUniqueVisitorsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT COUNT(pv) FROM PageView pv WHERE pv.timestamp >= :start")
    Long countPageViewsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT pv.device, COUNT(pv) FROM PageView pv WHERE pv.timestamp >= :start GROUP BY pv.device")
    List<Object[]> getDeviceStatsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT pv.browser, COUNT(pv) FROM PageView pv WHERE pv.timestamp >= :start GROUP BY pv.browser")
    List<Object[]> getBrowserStatsSince(@Param("start") LocalDateTime start);
    
    @Query("SELECT pv.country, COUNT(pv) FROM PageView pv WHERE pv.country IS NOT NULL AND pv.timestamp >= :start GROUP BY pv.country ORDER BY COUNT(pv) DESC")
    List<Object[]> getCountryStatsSince(@Param("start") LocalDateTime start);
} 