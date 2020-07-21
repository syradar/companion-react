import React, { useState, Fragment } from 'react';
import './App.css';
import Card from './Card';
import SpellbookPage from './Spellbook';
import { AbilityScore, createAbilityScore } from './abilityScores';
import { pluck } from 'rambda';
import { Race, playerRaces } from './races';
import FeatListComponent from './FeatListComponent';
import DisplayModifierComponent from './DisplayModifierComponent';
import Paragraph from './Paragraphs';
import Paragraphs from './Paragraphs';
import SeparatedList from './SeparatedList';
import { displaySign } from './functions';

export type Defense = 'PD' | 'AC' | 'MD';
export type DamageType = 'Fire' | 'Frost' | 'Positive energy';

export interface Character {
  name: string;
  id: number;
  abilityScores?: AbilityScore[];
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
    abilityScores: [
      createAbilityScore('CHA', 11),
      createAbilityScore('CON', 15),
      createAbilityScore('DEX', 13),
      createAbilityScore('INT', 19),
      createAbilityScore('STR', 9),
      createAbilityScore('WIS', 13),
    ],
  } as Character);
  const handleRemoveCharacter = (id: number) =>
    setCharacters((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="App">
      <header className="App-header">
        <h1>Companion</h1>
      </header>
      <main>
        <nav>
          <div>character/create</div>
        </nav>
        <h2>Characters</h2>
        <button type="button">New</button>
        {playerRaces.map((pr) => (
          <>
            <h2>{pr.name}</h2>
            <h3>Racial Bonus</h3>
            <SeparatedList
              separator={' or '}
              values={pr.bonus}
              display={(v) => (
                <Fragment>
                  <DisplayModifierComponent value={v.value} /> {v.tag}
                </Fragment>
              )}
            />
            {pr.power.map((p, index) => (
              <Fragment key={index}>
                <h3>{p.name}</h3>
                {p.description && <Paragraphs paragraphs={p.description} />}
                <FeatListComponent feats={p.feats} />
              </Fragment>
            ))}

            <h3>Racial Feats</h3>
            <FeatListComponent feats={pr.feats} />
          </>
        ))}
        <ul>
          <li>
            <a href="#">Elorin - Wizard LVL 4</a>
          </li>
          <li>
            <a href="#">Kark - Barbarian LVL 3</a>
          </li>
          <li>
            <a href="#">Velatha - Rogue LVL 6</a>
          </li>
        </ul>
        {/* <SpellbookPage character={character} /> */}
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
