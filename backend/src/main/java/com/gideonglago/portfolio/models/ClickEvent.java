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
public class ClickEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;
    private String page;
    private String elementType; // button, link, card, etc.
    private String elementId;
    private String elementText;
    private String targetUrl;
    private Integer xPosition;
    private Integer yPosition;
    private LocalDateTime timestamp;
    private String userAgent;
    private String ipAddress;

    public ClickEvent(String sessionId, String page, String elementType, String elementId, String elementText) {
        this.sessionId = sessionId;
        this.page = page;
        this.elementType = elementType;
        this.elementId = elementId;
        this.elementText = elementText;
        this.timestamp = LocalDateTime.now();
    }
} 