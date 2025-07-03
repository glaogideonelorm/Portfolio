package com.gideonglago.portfolio.repositories;

import com.gideonglago.portfolio.models.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
} 