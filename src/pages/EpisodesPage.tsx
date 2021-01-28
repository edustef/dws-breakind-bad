import React from 'react';
import BackButton from '../components/BackButton';
import Episodes from '../components/Episodes';

export default function EpisodesPage() {
  return (
    <div>
      <BackButton />
      <h1>All episodes</h1>
      <Episodes />
    </div>
  );
}
