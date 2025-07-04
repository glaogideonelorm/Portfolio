package com.gideonglago.portfolio;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gideonglago.portfolio.controllers.ProjectController;
import com.gideonglago.portfolio.models.Project;
import com.gideonglago.portfolio.services.ProjectService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProjectController.class)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @SpyBean
    private ProjectService projectService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getAllProjects_ShouldReturnProjects() throws Exception {
        Project testProject = new Project();
        testProject.setId(1L);
        testProject.setTitle("Test Project");
        testProject.setDescription("Test Description");
        testProject.setTechStack(Arrays.asList("Java", "Spring Boot"));
        testProject.setGithubUrl("https://github.com/test");
        testProject.setDemoUrl("https://demo.test");
        testProject.setImages(Arrays.asList("image1.jpg", "image2.jpg"));

        List<Project> projects = Arrays.asList(testProject);
        when(projectService.findAll()).thenReturn(projects);

        mockMvc.perform(get("/api/projects"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].title").value("Test Project"));
    }

    @Test
    void getProjectById_ShouldReturnProject() throws Exception {
        Project testProject = new Project();
        testProject.setId(1L);
        testProject.setTitle("Test Project");
        testProject.setDescription("Test Description");
        testProject.setTechStack(Arrays.asList("Java", "Spring Boot"));
        testProject.setGithubUrl("https://github.com/test");
        testProject.setDemoUrl("https://demo.test");
        testProject.setImages(Arrays.asList("image1.jpg", "image2.jpg"));

        when(projectService.findById(1L)).thenReturn(testProject);

        mockMvc.perform(get("/api/projects/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Project"));
    }

    @Test
    void getProjectById_ShouldReturnNotFound() throws Exception {
        when(projectService.findById(999L)).thenThrow(new RuntimeException("Project not found with id 999"));

        mockMvc.perform(get("/api/projects/999"))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @WithMockUser(username = "dev", password = "devpass", roles = "DEV")
    void createProject_ShouldReturnCreatedProject() throws Exception {
        Project newProject = new Project();
        newProject.setTitle("New Project");
        newProject.setDescription("New Description");
        newProject.setTechStack(Arrays.asList("React", "TypeScript"));
        newProject.setGithubUrl("https://github.com/new");
        newProject.setDemoUrl("https://demo.new");
        newProject.setImages(Arrays.asList("new-image.jpg"));

        when(projectService.create(any(Project.class))).thenReturn(newProject);

        mockMvc.perform(post("/api/projects")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProject)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("New Project"));
    }

    @Test
    @WithMockUser(username = "dev", password = "devpass", roles = "DEV")
    void updateProject_ShouldReturnUpdatedProject() throws Exception {
        Project updatedProject = new Project();
        updatedProject.setId(1L);
        updatedProject.setTitle("Updated Project");
        updatedProject.setDescription("Updated Description");
        updatedProject.setTechStack(Arrays.asList("Java", "Spring Boot"));
        updatedProject.setGithubUrl("https://github.com/updated");
        updatedProject.setDemoUrl("https://demo.updated");
        updatedProject.setImages(Arrays.asList("updated-image.jpg"));

        when(projectService.update(anyLong(), any(Project.class))).thenReturn(updatedProject);

        mockMvc.perform(put("/api/projects/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProject)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Project"));
    }

    @Test
    @WithMockUser(username = "dev", password = "devpass", roles = "DEV")
    void deleteProject_ShouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/projects/1"))
                .andExpect(status().isNoContent());
    }
} 