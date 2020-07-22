/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core'
import tw, { css } from 'twin.macro'
import './App.css'
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom'
import CreateCharacter from './CreateCharacter'
import { h1Style, btnPrimary } from './styles/globalStyles'
import { playSound } from './bard'
import useSound from 'use-sound'
//import levelUp from './320655__rhodesmas__level-up-01.ogg'

function CharacterList() {
  let match = useRouteMatch()
  const [playLevelUp] = useSound(
    require('./320655__rhodesmas__level-up-01.ogg'),
    {
      volume: 0.5,
    },
  )

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <CreateCharacter />
      </Route>
      <Route path={`${match.path}`}>
        <h1 css={[h1Style]}>Characters</h1>
        <Link
          to={`${match.url}/new`}
          css={[btnPrimary]}
          onClick={() => playLevelUp()}
        >
          New character
        </Link>
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
      </Route>
    </Switch>
  )
}

export default CharacterList
