package com.gideonglago.portfolio.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gideonglago.portfolio.models.Project;
import com.gideonglago.portfolio.repositories.ProjectRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProjectRepository projectRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if no projects exist
        if (projectRepository.count() == 0) {
            initializeProjects();
        }
    }

    private void initializeProjects() {
        // Project 1: AI Portfolio Assistant
        Project aiPortfolio = new Project();
        aiPortfolio.setTitle("AI Portfolio Assistant");
        aiPortfolio.setDescription("A ChatGPT-powered bot that answers questions about my skills & projects live on my portfolio site. Features intelligent conversation capabilities, real-time responses, and seamless integration with my portfolio content.");
        aiPortfolio.setTechStack(Arrays.asList("Next.js", "OpenAI API", "Zustand", "TypeScript", "Tailwind CSS"));
        aiPortfolio.setGithubUrl("https://github.com/glaogideonelorm/Portfolio");
        aiPortfolio.setDemoUrl("https://gideonglago.com");
        aiPortfolio.setImages(Arrays.asList("/api/projects/1/images/1", "/api/projects/1/images/2"));

        // Project 2: P2P Payment Automation Platform
        Project p2pPayment = new Project();
        p2pPayment.setTitle("P2P Payment Automation Platform");
        p2pPayment.setDescription("A comprehensive peer-to-peer payment automation system built with Java and React. Features secure transaction processing, real-time payment tracking, automated reconciliation, and fraud detection capabilities.");
        p2pPayment.setTechStack(Arrays.asList("Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker"));
        p2pPayment.setGithubUrl("https://github.com/glaogideonelorm/p2p-payment-platform");
        p2pPayment.setDemoUrl("https://p2p-payment.demo.com");
        p2pPayment.setImages(Arrays.asList("/api/projects/2/images/1", "/api/projects/2/images/2"));

        // Project 3: Smart Expense Classifier
        Project expenseClassifier = new Project();
        expenseClassifier.setTitle("Smart Expense Classifier");
        expenseClassifier.setDescription("An AI-powered system that classifies bank SMS alerts into spending categories using transformer embeddings. Automatically categorizes transactions for better financial tracking and budgeting.");
        expenseClassifier.setTechStack(Arrays.asList("Python", "FastAPI", "HuggingFace", "Transformers", "Machine Learning"));
        expenseClassifier.setGithubUrl("https://github.com/glaogideonelorm/smart-expense-classifier");
        expenseClassifier.setDemoUrl("https://expense-classifier.demo.com");
        expenseClassifier.setImages(Arrays.asList("/api/projects/3/images/1", "/api/projects/3/images/2"));

        // Project 4: Code-Prompt Snippets
        Project codeSnippets = new Project();
        codeSnippets.setTitle("Code-Prompt Snippets");
        codeSnippets.setDescription("A VS Code extension that suggests code completions fine-tuned on my GitHub data. Provides intelligent code suggestions based on my coding patterns and project history.");
        codeSnippets.setTechStack(Arrays.asList("TypeScript", "OpenAI API", "VS Code Extension API", "Node.js"));
        codeSnippets.setGithubUrl("https://github.com/glaogideonelorm/code-prompt-snippets");
        codeSnippets.setDemoUrl("https://marketplace.visualstudio.com/items?itemName=glaogideonelorm.code-snippets");
        codeSnippets.setImages(Arrays.asList("/api/projects/4/images/1", "/api/projects/4/images/2"));

        // Project 5: P2P Fraud Detector
        Project fraudDetector = new Project();
        fraudDetector.setTitle("P2P Fraud Detector");
        fraudDetector.setDescription("A real-time fraud detection system for peer-to-peer transactions using machine learning. Detects anomalous transactions and suspicious patterns to prevent financial fraud.");
        fraudDetector.setTechStack(Arrays.asList("Java", "XGBoost", "Spring Boot", "Apache Kafka", "Redis", "Docker"));
        fraudDetector.setGithubUrl("https://github.com/glaogideonelorm/p2p-fraud-detector");
        fraudDetector.setDemoUrl("https://fraud-detector.demo.com");
        fraudDetector.setImages(Arrays.asList("/api/projects/5/images/1", "/api/projects/5/images/2"));

        // Project 6: Cybersecurity Dashboard
        Project cyberDashboard = new Project();
        cyberDashboard.setTitle("Cybersecurity Dashboard");
        cyberDashboard.setDescription("A comprehensive cybersecurity monitoring dashboard that provides real-time threat detection, vulnerability assessment, and security analytics. Features include network monitoring, incident response, and compliance reporting.");
        cyberDashboard.setTechStack(Arrays.asList("React", "Node.js", "PostgreSQL", "Docker", "Redis", "WebSocket"));
        cyberDashboard.setGithubUrl("https://github.com/glaogideonelorm/cyber-dashboard");
        cyberDashboard.setDemoUrl("https://cyber-dashboard.demo.com");
        cyberDashboard.setImages(Arrays.asList("/api/projects/6/images/1", "/api/projects/6/images/2"));

        // Save all projects
        List<Project> projects = Arrays.asList(
            aiPortfolio, p2pPayment, expenseClassifier, codeSnippets, fraudDetector, cyberDashboard
        );
        
        projectRepository.saveAll(projects);
        System.out.println("✅ Gideon's real projects initialized successfully!");
    }
} 