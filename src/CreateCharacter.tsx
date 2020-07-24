/** @jsx jsx */
import { Fragment, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { jsx } from '@emotion/core';

import './App.css';
//import { useRouteMatch } from 'react-router-dom';
import { h1Style } from './styles/globalStyles';
import ChooseRace from './components/character/chooseRace';
import ChooseClass from './components/character/chooseClass';
import { AbilityScoreBonus, Race } from './models/races';
import Heading from './components/heading';
import { PlayerClass } from './models/classes';
import { pluck } from 'rambda';
import { AbilityScoreTag } from './models/abilityScores';

export interface AbilityScoreBonusDisplay {
  tag: AbilityScoreTag;
  value: number;
  enabled: boolean;
}

function CreateCharacter() {
  //let match = useRouteMatch();

  const handleChoice = (bonus: AbilityScoreBonusDisplay) => {
    setAbilityScoreBonusDisplay(prev => {
      const bonuses = [...prev, bonus];
      setTakenAbilityScoreTag(_ => pluck('tag', bonuses));
      return bonuses;
    });
  };

  const [abilityScoreBonusDisplay, setAbilityScoreBonusDisplay] = useState<
    AbilityScoreBonusDisplay[]
  >([]);

  const [takenAbilityScoreTag, setTakenAbilityScoreTag] = useState<
    AbilityScoreTag[]
  >([]);

  return (
    <Fragment>
      <h1 css={[h1Style]}>Create Character</h1>
      <Heading lvl={2}>Ability Score Bonus Choices</Heading>
      {abilityScoreBonusDisplay.map((asb, index) => (
        <div key={index}>
          {asb.tag} {asb.value}
        </div>
      ))}
      <ChooseRace
        name={'Choose race'}
        onChoice={handleChoice}
        takenAbilityScoreTag={takenAbilityScoreTag}
      />
      <ChooseClass
        name={'Choose class'}
        onChoice={handleChoice}
        takenAbilityScoreTag={takenAbilityScoreTag}
      />
    </Fragment>
  );
}

export default CreateCharacter;
