import React, { useState } from "react";
import "./App.css";
import Card from "./Card";

export interface Character {
  name: string;
  id: number;
}
function App() {
  const [characters, setCharacters] = useState([
    {
      name: `scanlan`,
      id: 0,
    },
    {
      name: `grog`,
      id: 1,
    },
    {
      name: `goblin #37`,
      id: 2,
    },
  ]);

  const handleRemoveCharacter = (id: number) =>
    setCharacters((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="App">
      <header className="App-header"></header>
      {characters.map((c) => (
        <Card
          key={c.id}
          character={c}
          onCharacterDelete={handleRemoveCharacter}
        />
      ))}
    </div>
  );
}

export default App;
