// app/projects/page.tsx
import React from 'react';

const projects = [
  {
    id: 'project-one',
    title: 'Project One',
    description: 'This is a description for Project One.',
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Projects</h1>
      {projects.map((project) => (
        <section key={project.id} id={project.id} style={{ marginBottom: '2rem' }}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </section>
      ))}
    </div>
  );
}
