import React, { useState } from 'react';
import './App.css';
import Card from './Card';
import SpellbookPage from './Spellbook';

export const abilityModifier = (score: number): number =>
  Math.floor((score - 10) / 2);

export type AbilityScoreName =
  | 'Charisma'
  | 'Constitution'
  | 'Dexterity'
  | 'Intelligence'
  | 'Strength'
  | 'Wisdom';

export type AbilityScoreTag = 'CHA' | 'CON' | 'DEX' | 'INT' | 'STR' | 'WIS';

export const abilityScoreNameFromTag = (
  tag: AbilityScoreTag
): AbilityScoreName => {
  switch (tag) {
    case 'CHA':
      return 'Charisma';
    case 'CON':
      return 'Constitution';
    case 'DEX':
      return 'Dexterity';
    case 'INT':
      return 'Intelligence';
    case 'STR':
      return 'Strength';
    case 'WIS':
      return 'Wisdom';
  }
};

export const createAbilityScore = (tag: AbilityScoreTag, score: number) => {
  return {
    name: abilityScoreNameFromTag(tag),
    tag,
    score,
    modifier: abilityModifier(score),
  };
};
export interface AbilityScore {
  name: AbilityScoreName;
  tag: AbilityScoreTag;
  score: number;
  modifier: number;
}
export interface AbilityScores {
  strength: AbilityScore;
  dexterity: AbilityScore;
  constitution: AbilityScore;
  intelligence: AbilityScore;
  charisma: AbilityScore;
  wisdom: AbilityScore;
}

export interface Character {
  name: string;
  id: number;
  abilityScores?: AbilityScores;
}

export interface CombatParticipant extends Character {
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
  ] as CombatParticipant[]);

  const [character, setCharacter] = useState({
    id: 123,
    name: 'Wizard',
    abilityScores: {
      charisma: createAbilityScore('CHA', 11),
      constitution: createAbilityScore('CON', 15),
      dexterity: createAbilityScore('DEX', 13),
      intelligence: createAbilityScore('INT', 19),
      strength: createAbilityScore('STR', 9),
      wisdom: createAbilityScore('WIS', 13),
    },
  } as Character);
  const handleRemoveCharacter = (id: number) =>
    setCharacters((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <SpellbookPage character={character} />
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
