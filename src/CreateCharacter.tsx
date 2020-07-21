import React, { Fragment } from 'react';
import './App.css';
import { useRouteMatch, Link } from 'react-router-dom';
import { playerRaces } from './races';
import SeparatedList from './SeparatedList';
import DisplayModifierComponent from './DisplayModifierComponent';
import FeatListComponent from './FeatListComponent';
import Paragraphs from './Paragraphs';

function CreateCharacter() {
  let match = useRouteMatch();

  return (
    <Fragment>
      <h1>Create Character</h1>
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
    </Fragment>
  );
}

export default CreateCharacter;
