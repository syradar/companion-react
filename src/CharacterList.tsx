import React, { Fragment } from 'react';
import './App.css';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import CreateCharacter from './CreateCharacter';

function CharacterList() {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/new`}>
          <CreateCharacter />
        </Route>
        <Route path={`${match.path}`}>
          <h1>Characters</h1>
          <Link to={`${match.url}/new`}>New character</Link>
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
    </div>
  );
}

export default CharacterList;
