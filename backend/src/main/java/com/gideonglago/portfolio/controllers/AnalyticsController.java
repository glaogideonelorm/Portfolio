package com.gideonglago.portfolio.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gideonglago.portfolio.services.AnalyticsService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    // Tracking endpoints
    @PostMapping("/track/pageview")
    public ResponseEntity<Map<String, String>> trackPageView(
            @RequestBody Map<String, String> payload,
            HttpServletRequest request) {
        
        String page = payload.get("page");
        String sessionId = payload.get("sessionId");
        
        if (page == null || sessionId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Page and sessionId are required"));
        }
        
        analyticsService.trackPageView(page, sessionId, request);
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @PostMapping("/track/click")
    public ResponseEntity<Map<String, String>> trackClick(
            @RequestBody Map<String, Object> payload,
            HttpServletRequest request) {
        
        String sessionId = (String) payload.get("sessionId");
        String page = (String) payload.get("page");
        String elementType = (String) payload.get("elementType");
        String elementId = (String) payload.get("elementId");
        String elementText = (String) payload.get("elementText");
        String targetUrl = (String) payload.get("targetUrl");
        Integer x = payload.get("x") != null ? (Integer) payload.get("x") : null;
        Integer y = payload.get("y") != null ? (Integer) payload.get("y") : null;
        
        if (sessionId == null || page == null || elementType == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "SessionId, page, and elementType are required"));
        }
        
        analyticsService.trackClick(sessionId, page, elementType, elementId, elementText, targetUrl, x, y, request);
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    // Analytics retrieval endpoints
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats(
            @RequestParam(defaultValue = "week") String period) {
        
        Map<String, Object> stats = analyticsService.getDashboardStats(period);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/activity")
    public ResponseEntity<List<Map<String, Object>>> getRecentActivity(
            @RequestParam(defaultValue = "50") int limit) {
        
        List<Map<String, Object>> activities = analyticsService.getRecentActivity(limit);
        return ResponseEntity.ok(activities);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "healthy", "service", "analytics"));
    }
} 