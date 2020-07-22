/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import './App.css';
import { useRouteMatch, Link, Switch, Route } from 'react-router-dom';
import CreateCharacter from './CreateCharacter';
import { h1Style, btnPrimary } from './styles/globalStyles';
import useSound from 'use-sound';

function CharacterList() {
  let match = useRouteMatch();

  const [playLevelUp] = useSound(
    require('./sounds/320655__rhodesmas__level-up-01.ogg'),
    {
      volume: 0.5,
    },
  );

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
          <li>Elorin - Wizard LVL 4</li>
          <li>Kark - Barbarian LVL 3</li>
          <li>Velatha - Rogue LVL 6</li>
        </ul>
      </Route>
    </Switch>
  );
}

export default CharacterList;
