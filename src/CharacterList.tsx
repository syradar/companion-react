/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/core'
import tw, { css } from 'twin.macro'
import './App.css'
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom'
import CreateCharacter from './CreateCharacter'
import { h1Style } from './styles/globalStyles'

function CharacterList() {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <CreateCharacter />
      </Route>
      <Route path={`${match.path}`}>
        <h1 css={[h1Style]}>Characters</h1>
        <Link
          to={`${match.url}/new`}
          tw="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
