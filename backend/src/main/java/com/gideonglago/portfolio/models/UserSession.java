package com.gideonglago.portfolio.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class UserSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;
    private String ipAddress;
    private String userAgent;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Long totalDuration; // in seconds
    private Integer pageViews;
    private Integer clicks;
    private String entryPage;
    private String exitPage;
    private String referrer;
    private String device;
    private String browser;
    private String os;
    private String country;
    private String city;
    private Boolean isReturningVisitor;
    @ElementCollection
    private List<String> pagesVisited;

    public UserSession(String sessionId, String ipAddress, String userAgent, String entryPage, String referrer) {
        this.sessionId = sessionId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.entryPage = entryPage;
        this.referrer = referrer;
        this.startTime = LocalDateTime.now();
        this.pageViews = 1;
        this.clicks = 0;
        this.isReturningVisitor = false;
    }
} 