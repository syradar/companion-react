/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { btnPrimary } from '../../styles/globalStyles';
import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { Fragment } from 'react';
import { classes, PlayerClass } from '../../models/classes';
import ClassCard from './classCard';
import Heading from '../heading';
import { AbilityScoreBonus } from '../../models/races';
import { AbilityScoreTag } from '../../models/abilityScores';
import DisplayModifierComponent from '../../DisplayModifierComponent';
import { prop } from 'rambda';

interface ChooseClassProps {
  name: string;
  onChoice: (bonus: AbilityScoreBonus) => void;
  takenAbilityScoreBonuses: AbilityScoreTag[];
}

interface ChoiceContext {
  data: PlayerClass | undefined;
  bonus: AbilityScoreBonus | undefined;
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
        CLASS_CHOSEN: {
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

function ChooseClass({
  name,
  onChoice,
  takenAbilityScoreBonuses,
}: ChooseClassProps) {
  const [state, send] = useMachine(choiceMachine, {
    actions: {
      notifyChoice: ctx => onChoice(ctx.bonus as AbilityScoreBonus),
    },
  });

  switch (state.value) {
    case 'idle':
      return (
        <Fragment>
          <Heading lvl={2}>{name}</Heading>
          {classes.map((c, index) => (
            <div key={index} tw="rounded shadow-lg p-4 mb-4">
              <ClassCard playerClass={c} />

              <button
                css={[btnPrimary]}
                onClick={() => send('CLASS_CHOSEN', { data: c })}
              >
                Choose
              </button>
            </div>
          ))}
        </Fragment>
      );
    case 'chooseBonus':
      return (
        <Fragment>
          <Heading lvl={2}>{name}</Heading>
          <div tw="rounded shadow-lg p-4 mb-4">
            <Heading lvl={3}>{state.context.data?.name}</Heading>
            <p tw="mb-4">Choose Ability Score Bonus:</p>

            {state.context.data?.bonus
              .filter(b => !takenAbilityScoreBonuses.includes(b.tag))
              .map((b, index) => (
                <button
                  css={[btnPrimary, tw`mr-4`]}
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
        <div tw="rounded shadow-lg p-4 mb-4">
          <ClassCard playerClass={state.context.data as PlayerClass} />
        </div>
      );
    default:
      return null;
  }
}

export default ChooseClass;
