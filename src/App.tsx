/** @jsx jsx */
import React, { useState } from 'react'
import './App.css'
import {
  AbilityScore,
  createAbilityScore,
  AbilityScoreTag,
} from './abilityScores'
import CharacterList from './CharacterList'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import tw, { css, styled } from 'twin.macro'
import 'tailwindcss/dist/base.min.css'
import { jsx } from '@emotion/core'

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
  name: string
  id: number
  abilityScores?: AbilityScore[]
}

export interface CombatParticipant extends Character {
  initiative: number
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
  ] as CombatParticipant[])

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
  } as Character)

  return (
    <Router>
      <div css={['App']}>
        <nav tw="flex items-center justify-between flex-wrap bg-blue-500 text-white p-6 mb-6">
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
        <main tw="px-4">
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
  )
}

export default App

function Home() {
  return <h2>Home</h2>
}
