/** @jsx jsx */
import './App.css';
import { AbilityScore } from './models/abilityScores';
import CharacterList from './CharacterList';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css, styled } from 'twin.macro';
import 'tailwindcss/dist/base.min.css';
import { jsx } from '@emotion/core';

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
  return (
    <Router>
      <div css={['App']}>
        <nav tw="flex items-center justify-between flex-wrap bg-gray-700 text-white p-6 shadow-lg">
          <ul tw="flex items-center justify-between flex-wrap">
            <li tw="mr-4">
              <Link tw="text-xl font-bold hover:text-black" to="/">
                Companion
              </Link>
            </li>
            <li>
              <Link tw="hover:text-black" to="/characters">
                Characters
              </Link>
            </li>
          </ul>
        </nav>
        <main tw="py-4 px-2 sm:px-4">
          <Switch>
            <Route path="/characters">
              <CharacterList />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return <h2>Home</h2>;
}
