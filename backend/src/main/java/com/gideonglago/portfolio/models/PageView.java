package com.gideonglago.portfolio.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class PageView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String page;
    private String referrer;
    private String userAgent;
    private String ipAddress;
    private String sessionId;
    private LocalDateTime timestamp;
    private Long duration; // time spent on page in seconds
    private String device;
    private String browser;
    private String os;
    private String country;
    private String city;

    public PageView(String page, String referrer, String userAgent, String ipAddress, String sessionId) {
        this.page = page;
        this.referrer = referrer;
        this.userAgent = userAgent;
        this.ipAddress = ipAddress;
        this.sessionId = sessionId;
        this.timestamp = LocalDateTime.now();
    }
} 