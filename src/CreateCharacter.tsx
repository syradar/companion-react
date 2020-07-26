/** @jsx jsx */
import { Fragment, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { jsx } from '@emotion/core';

import './App.css';
//import { useRouteMatch } from 'react-router-dom';
import { h1Style, cardStyle } from './styles/globalStyles';
import ChooseRace from './components/character/chooseRace';
import ChooseClass from './components/character/chooseClass';
import { AbilityScoreBonus, Race } from './models/races';
import Heading from './components/heading';
import { PlayerClass } from './models/classes';
import { pluck } from 'rambda';
import { AbilityScoreTag } from './models/abilityScores';
import Button from './components/button';

export interface AbilityScoreBonusDisplay {
  tag: AbilityScoreTag;
  value: number;
  enabled: boolean;
}

export enum AbilitScoreMethods {
  PointBuy = `Point Buy`,
  Roll = `Roll'em`,
  Array = `Array`,
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

  const [abilitScoreMethod, setAbilitScoreMethod] = useState<
    AbilitScoreMethods
  >();

  const chooseAbilityScoreMethod = (absm: AbilitScoreMethods) => (_: any) =>
    setAbilitScoreMethod(() => absm);

  return (
    <Fragment>
      <Heading lvl={1}>Create Character</Heading>
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
      <div>
        <Heading lvl={2}>Determine Ability Scores</Heading>

        <div css={[cardStyle, tw`mb-4`]}>
          {Object.values(AbilitScoreMethods).map((value, index) => (
            <Button
              key={index}
              style={tw`mr-4`}
              onClick={chooseAbilityScoreMethod(value)}
            >
              {value}
            </Button>
          ))}
          <Heading lvl={3}>{abilitScoreMethod}</Heading>
        </div>
      </div>
    </Fragment>
  );
}

export default CreateCharacter;
