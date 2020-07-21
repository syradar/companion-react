import React, { useState, Fragment } from 'react';
import './App.css';
import { AbilityScore, createAbilityScore } from './abilityScores';
import { playerRaces } from './races';
import FeatListComponent from './FeatListComponent';
import DisplayModifierComponent from './DisplayModifierComponent';
import Paragraphs from './Paragraphs';
import SeparatedList from './SeparatedList';
import CharacterList from './CharacterList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CreateCharacter from './CreateCharacter';

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
  const [, setCharacters] = useState([
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
      createAbilityScore('CHA', 11),
      createAbilityScore('CON', 15),
      createAbilityScore('DEX', 13),
      createAbilityScore('INT', 19),
      createAbilityScore('STR', 9),
      createAbilityScore('WIS', 13),
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
