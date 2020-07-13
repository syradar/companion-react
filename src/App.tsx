import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import SpellbookPage from './Spellbook';

export interface Character {
  name: string;
  id: number;
  initiative: number;
}

function App() {
  const [characters, setCharacters] = useState([
    {
      name: `scanlan`,
      id: 0,
      initiative: 10,
    },
    {
      name: `grog`,
      id: 1,
      initiative: 7,
    },
    {
      name: `goblin #37`,
      id: 2,
      initiative: 20,
    },
  ]);

  const handleRemoveCharacter = (id: number) =>
    setCharacters((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <SpellbookPage />
        {/* <div className="card-list">
          {characters
            .sort((a, b) => b.initiative - a.initiative)
            .map((c) => (
              <Card
                key={c.id}
                character={c}
                onCharacterDelete={handleRemoveCharacter}
              />
            ))}
        </div> */}
      </main>
    </div>
  );
}

export default App;
