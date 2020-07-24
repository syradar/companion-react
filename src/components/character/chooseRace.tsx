/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { h2Style, btnPrimary, btnDisabled } from '../../styles/globalStyles';
import { playerRaces, Race, AbilityScoreBonus } from '../../models/races';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import RaceCard from './raceCard';
import { Fragment } from 'react';
import Heading from '../heading';
import Paragraphs from '../../Paragraphs';
import DisplayModifierComponent from '../../DisplayModifierComponent';
import { AbilityScoreTag } from '../../models/abilityScores';
import { AbilityScoreBonusDisplay } from '../../CreateCharacter';

interface ChooseRaceProps {
  name: string;
  onChoice: (bonus: AbilityScoreBonusDisplay) => void;
  takenAbilityScoreTag: AbilityScoreTag[];
}

interface ChoiceContext {
  data: Race | undefined;
  bonus: AbilityScoreBonusDisplay | undefined;
}

const choiceMachine = Machine<ChoiceContext>({
  id: 'choice',
  initial: 'idle',
  context: {
    data: undefined,
    bonus: undefined,
  },
  states: {
    idle: {
      on: {
        RACE_CHOSEN: {
          target: 'chooseBonus',
          actions: assign({
            data: (context, event) => (context.data = event.data),
          }),
        },
      },
    },
    chooseBonus: {
      on: {
        BONUS_CHOSEN: {
          target: 'chosen',
          actions: assign({
            bonus: (context, event) => (context.bonus = event.bonus),
          }),
        },
      },
    },
    chosen: {
      type: 'final',
      entry: 'notifyChoice',
    },
  },
});

function ChooseRace({ name, onChoice, takenAbilityScoreTag }: ChooseRaceProps) {
  const [state, send] = useMachine(choiceMachine, {
    actions: {
      notifyChoice: ctx => onChoice(ctx.bonus as AbilityScoreBonusDisplay),
    },
  });

  switch (state.value) {
    case 'idle':
      return (
        <div tw="mb-8">
          <Heading lvl={2}>{name}</Heading>
          <div tw="grid grid-flow-col gap-4 items-start">
            {playerRaces.map((pr, index) => (
              <div key={index} tw="bg-white rounded-xl shadow-lg p-4">
                <div tw="mb-4">
                  <RaceCard race={pr}></RaceCard>
                </div>

                <button
                  css={[btnPrimary]}
                  onClick={() => send('RACE_CHOSEN', { data: pr })}
                >
                  Choose
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    case 'chooseBonus':
      return (
        <Fragment>
          <Heading lvl={2}>{name}</Heading>
          <div tw="bg-white rounded-xl shadow-lg p-4 mb-4">
            <Heading lvl={3}>{state.context.data?.name}</Heading>
            <p tw="mb-4">Choose Ability Score Bonus:</p>
            {state.context.data?.bonus
              .map(b => ({
                ...b,
                enabled: !takenAbilityScoreTag.includes(b.tag),
              }))
              .map((b, index) => (
                <button
                  css={[b.enabled ? btnPrimary : btnDisabled, tw`mr-4`]}
                  key={index}
                  onClick={() => send('BONUS_CHOSEN', { bonus: b })}
                >
                  {b.tag} <DisplayModifierComponent value={b.value} />
                </button>
              ))}
          </div>
        </Fragment>
      );
    case 'chosen':
      return (
        <Fragment>
          <Heading lvl={2}>{name}</Heading>
          <div tw="bg-white rounded-xl shadow-lg p-4 mb-4">
            <Heading lvl={3}>{state.context.data?.name}</Heading>

            <div>
              {state.context.bonus?.tag}{' '}
              <DisplayModifierComponent
                value={state.context.bonus?.value ?? 0}
              />
            </div>
          </div>
        </Fragment>
      );

    default:
      return null;
  }
}

export default ChooseRace;
