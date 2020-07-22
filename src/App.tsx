import React, { useState } from 'react';
import './App.css';
import {
  AbilityScore,
  createAbilityScore,
  AbilityScoreTag,
} from './abilityScores';
import CharacterList from './CharacterList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export enum Defense {
  AC = 'Armor Class',
  MD = 'Mental Defense',
  PD = 'Physical Defense',
}

export enum DamageType {
  Fire = 'Fire',
  Frost = 'Frost',
  Positive = 'Positive energy',
  Force = 'Force',
  Cold = 'Cold',
  None = '',
}

export interface Character {
  name: string;
  id: number;
  abilityScores?: AbilityScore[];
}

export interface CombatParticipant extends Character {
  initiative: number;
}

function App() {
  const [] = useState([
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

  const [] = useState({
    id: 123,
    name: 'Wizard',
    abilityScores: [
      createAbilityScore(AbilityScoreTag.CHA, 11),
      createAbilityScore(AbilityScoreTag.CON, 15),
      createAbilityScore(AbilityScoreTag.DEX, 13),
      createAbilityScore(AbilityScoreTag.INT, 19),
      createAbilityScore(AbilityScoreTag.STR, 9),
      createAbilityScore(AbilityScoreTag.WIS, 13),
    ],
  } as Character);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Companion</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/characters">Characters</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/characters">
              <CharacterList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>

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
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}
