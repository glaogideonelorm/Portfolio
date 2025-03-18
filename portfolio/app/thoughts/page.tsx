// app/thoughts/page.tsx
import React from 'react';

const thoughts = [
  {
    id: 'thought-one',
    title: 'Thought One',
    content: 'This is my first thought. More reflective content can be added here.',
  },
  // Add more thoughts as needed
];

export default function Thoughts() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Thoughts</h1>
      {thoughts.map((thought) => (
        <section key={thought.id} style={{ marginBottom: '2rem' }}>
          <h2>{thought.title}</h2>
          <p>{thought.content}</p>
        </section>
      ))}
    </div>
  );
}
