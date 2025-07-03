package com.gideonglago.portfolio.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.gideonglago.portfolio.models.Project;
import com.gideonglago.portfolio.repositories.ProjectRepository;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public Project findById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id " + id));
    }

    public Project create(Project project) {
        project.setId(null); // ensure new entity
        return projectRepository.save(project);
    }

    public Project update(Long id, Project updated) {
        Project existing = findById(id);
        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());
        existing.setTechStack(updated.getTechStack());
        existing.setGithubUrl(updated.getGithubUrl());
        existing.setDemoUrl(updated.getDemoUrl());
        existing.setImages(updated.getImages());
        return projectRepository.save(existing);
    }

    public void delete(Long id) {
        Project existing = findById(id);
        projectRepository.delete(existing);
    }
} 