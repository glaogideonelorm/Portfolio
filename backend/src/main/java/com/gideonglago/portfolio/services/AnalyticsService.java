package com.gideonglago.portfolio.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gideonglago.portfolio.models.ClickEvent;
import com.gideonglago.portfolio.models.PageView;
import com.gideonglago.portfolio.models.UserSession;
import com.gideonglago.portfolio.repositories.ClickEventRepository;
import com.gideonglago.portfolio.repositories.PageViewRepository;
import com.gideonglago.portfolio.repositories.UserSessionRepository;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class AnalyticsService {

    private final PageViewRepository pageViewRepository;
    private final ClickEventRepository clickEventRepository;
    private final UserSessionRepository userSessionRepository;

    public AnalyticsService(PageViewRepository pageViewRepository, 
                          ClickEventRepository clickEventRepository,
                          UserSessionRepository userSessionRepository) {
        this.pageViewRepository = pageViewRepository;
        this.clickEventRepository = clickEventRepository;
        this.userSessionRepository = userSessionRepository;
    }

    // Tracking methods
    public void trackPageView(String page, String sessionId, HttpServletRequest request) {
        String userAgent = request.getHeader("User-Agent");
        String referrer = request.getHeader("Referer");
        String ipAddress = getClientIpAddress(request);
        
        PageView pageView = new PageView(page, referrer, userAgent, ipAddress, sessionId);
        
        // Parse user agent for device info
        parseUserAgent(pageView, userAgent);
        
        pageViewRepository.save(pageView);
        
        // Update or create user session
        updateUserSession(sessionId, page, referrer, userAgent, ipAddress);
    }

    public void trackClick(String sessionId, String page, String elementType, String elementId, 
                          String elementText, String targetUrl, Integer x, Integer y, HttpServletRequest request) {
        ClickEvent clickEvent = new ClickEvent(sessionId, page, elementType, elementId, elementText);
        clickEvent.setTargetUrl(targetUrl);
        clickEvent.setXPosition(x);
        clickEvent.setYPosition(y);
        clickEvent.setUserAgent(request.getHeader("User-Agent"));
        clickEvent.setIpAddress(getClientIpAddress(request));
        
        clickEventRepository.save(clickEvent);
        
        // Update session click count
        userSessionRepository.findBySessionId(sessionId).ifPresent(session -> {
            session.setClicks(session.getClicks() + 1);
            userSessionRepository.save(session);
        });
    }

    // Analytics retrieval methods
    public Map<String, Object> getDashboardStats(String period) {
        LocalDateTime since = getSinceDate(period);
        Map<String, Object> stats = new HashMap<>();
        
        // Basic metrics
        stats.put("totalPageViews", pageViewRepository.countPageViewsSince(since));
        stats.put("uniqueVisitors", pageViewRepository.countUniqueVisitorsSince(since));
        stats.put("totalClicks", clickEventRepository.countClicksSince(since));
        stats.put("avgSessionDuration", userSessionRepository.getAverageSessionDurationSince(since));
        stats.put("avgPageViewsPerSession", userSessionRepository.getAveragePageViewsPerSessionSince(since));
        stats.put("returningVisitors", userSessionRepository.countReturningVisitorsSince(since));
        stats.put("newVisitors", userSessionRepository.countNewVisitorsSince(since));
        
        // Popular content
        stats.put("popularPages", convertToMap(pageViewRepository.findPopularPagesSince(since)));
        stats.put("topClickedElements", convertToMap(clickEventRepository.findMostClickedElementsSince(since)));
        stats.put("entryPages", convertToMap(userSessionRepository.findMostCommonEntryPagesSince(since)));
        stats.put("exitPages", convertToMap(userSessionRepository.findMostCommonExitPagesSince(since)));
        
        // Technical stats
        stats.put("deviceStats", convertToMap(pageViewRepository.getDeviceStatsSince(since)));
        stats.put("browserStats", convertToMap(pageViewRepository.getBrowserStatsSince(since)));
        stats.put("countryStats", convertToMap(pageViewRepository.getCountryStatsSince(since)));
        stats.put("referrerStats", convertToMap(userSessionRepository.findTopReferrersSince(since)));
        
        // Trend data
        stats.put("pageViewTrend", getPageViewTrend(since));
        stats.put("clickTrend", getClickTrend(since));
        
        return stats;
    }

    public List<Map<String, Object>> getRecentActivity(int limit) {
        List<Map<String, Object>> activities = new ArrayList<>();
        
        // Get recent page views
        List<PageView> recentPageViews = pageViewRepository.findAll()
            .stream()
            .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
            .limit(limit / 2)
            .collect(Collectors.toList());
            
        for (PageView pv : recentPageViews) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("type", "pageview");
            activity.put("page", pv.getPage());
            activity.put("timestamp", pv.getTimestamp());
            activity.put("device", pv.getDevice());
            activity.put("country", pv.getCountry());
            activities.add(activity);
        }
        
        // Get recent clicks
        List<ClickEvent> recentClicks = clickEventRepository.findAll()
            .stream()
            .sorted((a, b) -> b.getTimestamp().compareTo(a.getTimestamp()))
            .limit(limit / 2)
            .collect(Collectors.toList());
            
        for (ClickEvent ce : recentClicks) {
            Map<String, Object> activity = new HashMap<>();
            activity.put("type", "click");
            activity.put("element", ce.getElementText() != null ? ce.getElementText() : ce.getElementId());
            activity.put("page", ce.getPage());
            activity.put("timestamp", ce.getTimestamp());
            activities.add(activity);
        }
        
        return activities.stream()
            .sorted((a, b) -> ((LocalDateTime) b.get("timestamp")).compareTo((LocalDateTime) a.get("timestamp")))
            .limit(limit)
            .collect(Collectors.toList());
    }

    // Helper methods
    private void updateUserSession(String sessionId, String page, String referrer, String userAgent, String ipAddress) {
        Optional<UserSession> existingSession = userSessionRepository.findBySessionId(sessionId);
        
        if (existingSession.isPresent()) {
            UserSession session = existingSession.get();
            session.setPageViews(session.getPageViews() + 1);
            session.setExitPage(page);
            
            // Add page to visited pages if not already there
            if (session.getPagesVisited() == null) {
                session.setPagesVisited(new ArrayList<>());
            }
            if (!session.getPagesVisited().contains(page)) {
                session.getPagesVisited().add(page);
            }
            
            userSessionRepository.save(session);
        } else {
            // Check if returning visitor based on IP
            boolean isReturning = !userSessionRepository.findByIpAddress(ipAddress).isEmpty();
            
            UserSession newSession = new UserSession(sessionId, ipAddress, userAgent, page, referrer);
            newSession.setIsReturningVisitor(isReturning);
            parseUserAgent(newSession, userAgent);
            
            userSessionRepository.save(newSession);
        }
    }

    private void parseUserAgent(Object entity, String userAgent) {
        if (userAgent == null) return;
        
        String device = "Desktop";
        String browser = "Unknown";
        String os = "Unknown";
        
        // Simple user agent parsing
        if (userAgent.contains("Mobile") || userAgent.contains("Android") || userAgent.contains("iPhone")) {
            device = "Mobile";
        } else if (userAgent.contains("Tablet") || userAgent.contains("iPad")) {
            device = "Tablet";
        }
        
        if (userAgent.contains("Chrome")) {
            browser = "Chrome";
        } else if (userAgent.contains("Firefox")) {
            browser = "Firefox";
        } else if (userAgent.contains("Safari")) {
            browser = "Safari";
        } else if (userAgent.contains("Edge")) {
            browser = "Edge";
        }
        
        if (userAgent.contains("Windows")) {
            os = "Windows";
        } else if (userAgent.contains("Mac")) {
            os = "macOS";
        } else if (userAgent.contains("Linux")) {
            os = "Linux";
        } else if (userAgent.contains("Android")) {
            os = "Android";
        } else if (userAgent.contains("iOS")) {
            os = "iOS";
        }
        
        if (entity instanceof PageView) {
            PageView pv = (PageView) entity;
            pv.setDevice(device);
            pv.setBrowser(browser);
            pv.setOs(os);
        } else if (entity instanceof UserSession) {
            UserSession us = (UserSession) entity;
            us.setDevice(device);
            us.setBrowser(browser);
            us.setOs(os);
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String[] headers = {
            "X-Forwarded-For",
            "X-Real-IP",
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED"
        };
        
        for (String header : headers) {
            String ip = request.getHeader(header);
            if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
                return ip.split(",")[0];
            }
        }
        
        return request.getRemoteAddr();
    }

    private LocalDateTime getSinceDate(String period) {
        LocalDateTime now = LocalDateTime.now();
        switch (period.toLowerCase()) {
            case "hour":
                return now.minusHours(1);
            case "day":
                return now.minusDays(1);
            case "week":
                return now.minusWeeks(1);
            case "month":
                return now.minusMonths(1);
            case "year":
                return now.minusYears(1);
            default:
                return now.minusDays(7); // Default to week
        }
    }

    private List<Map<String, Object>> convertToMap(List<Object[]> queryResults) {
        return queryResults.stream()
            .map(row -> {
                Map<String, Object> map = new HashMap<>();
                map.put("label", row[0]);
                map.put("value", row[1]);
                if (row.length > 2) {
                    map.put("extra", row[2]);
                }
                return map;
            })
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getPageViewTrend(LocalDateTime since) {
        // Get hourly page view counts
        List<PageView> pageViews = pageViewRepository.findByTimestampBetween(since, LocalDateTime.now());
        
        Map<String, Long> hourlyCount = pageViews.stream()
            .collect(Collectors.groupingBy(
                pv -> pv.getTimestamp().toLocalDate().toString() + " " + pv.getTimestamp().getHour(),
                Collectors.counting()
            ));
            
        return hourlyCount.entrySet().stream()
            .map(entry -> {
                Map<String, Object> point = new HashMap<>();
                point.put("time", entry.getKey());
                point.put("count", entry.getValue());
                return point;
            })
            .sorted((a, b) -> a.get("time").toString().compareTo(b.get("time").toString()))
            .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getClickTrend(LocalDateTime since) {
        // Get hourly click counts
        List<ClickEvent> clicks = clickEventRepository.findByTimestampBetween(since, LocalDateTime.now());
        
        Map<String, Long> hourlyCount = clicks.stream()
            .collect(Collectors.groupingBy(
                ce -> ce.getTimestamp().toLocalDate().toString() + " " + ce.getTimestamp().getHour(),
                Collectors.counting()
            ));
            
        return hourlyCount.entrySet().stream()
            .map(entry -> {
                Map<String, Object> point = new HashMap<>();
                point.put("time", entry.getKey());
                point.put("count", entry.getValue());
                return point;
            })
            .sorted((a, b) -> a.get("time").toString().compareTo(b.get("time").toString()))
            .collect(Collectors.toList());
    }
} 