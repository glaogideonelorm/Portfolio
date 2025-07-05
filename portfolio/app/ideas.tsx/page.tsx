// app/ideas/page.tsx
import React from 'react';

const ideas = [
  {
    id: 'idea-one',
    title: 'Idea One',
    description: 'This is the description for Idea One.',
  },
  // Add more ideas as needed
];

export default function Ideas() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Ideas</h1>
      {ideas.map((idea) => (
        <section key={idea.id} style={{ marginBottom: '2rem' }}>
          <h2>{idea.title}</h2>
          <p>{idea.description}</p>
        </section>
      ))}
    </div>
  );
}
