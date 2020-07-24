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
import { CoinPurse, coinPurse } from '../../models/money';

interface ChooseClassProps {
  name: string;
  onChoice: (bonus: AbilityScoreBonus) => void;
  takenAbilityScoreBonuses: AbilityScoreTag[];
}

interface ChoiceContext {
  data: PlayerClass | undefined;
  bonus: AbilityScoreBonus | undefined;
  money: CoinPurse;
}

const choiceMachine = Machine<ChoiceContext>({
  id: 'choice',
  initial: 'idle',
  context: {
    data: undefined,
    bonus: undefined,
    money: coinPurse({}),
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
          target: 'chooseMoney',
          actions: assign({
            bonus: (context, event) => (context.bonus = event.bonus),
          }),
        },
      },
    },
    chooseMoney: {
      on: {
        MONEY_CHOSEN: {
          target: 'chosen',
          actions: assign({
            money: (context, event) => (context.money = event.money),
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
        <div tw="mb-8">
          <Heading lvl={2}>{name}</Heading>
          <div tw="grid grid-flow-col gap-4 items-start">
            {classes.map((c, index) => (
              <div key={index} tw="bg-white rounded-xl shadow-lg p-4 mb-4">
                <ClassCard playerClass={c} />

                <button
                  css={[btnPrimary]}
                  onClick={() => send('CLASS_CHOSEN', { data: c })}
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
    case 'chooseMoney':
      return (
        <Fragment>
          <Heading lvl={2}>{name}</Heading>
          <div tw="bg-white rounded-xl shadow-lg p-4 mb-4">
            <Heading lvl={3}>{state.context.data?.name}</Heading>
            <div tw="mb-4">
              {state.context.bonus?.tag}{' '}
              <DisplayModifierComponent
                value={state.context.bonus?.value ?? 0}
              />
            </div>
            <p tw="mb-4">Starting gold:</p>

            <button
              css={[btnPrimary, tw`mr-4`]}
              onClick={() =>
                send('MONEY_CHOSEN', {
                  money: state.context.data?.money.static.get(),
                })
              }
            >
              {state.context.data?.money.static.name}
            </button>

            <button
              css={[btnPrimary, tw`mr-4`]}
              onClick={() =>
                send('MONEY_CHOSEN', {
                  money: state.context.data?.money.random.get(),
                })
              }
            >
              {state.context.data?.money.random.name}
            </button>
          </div>
        </Fragment>
      );
    case 'chosen':
      return (
        <div tw="bg-white rounded-xl shadow-lg p-4 mb-4">
          <ClassCard playerClass={state.context.data as PlayerClass} />
          <div tw="mb-4">
            {state.context.bonus?.tag}{' '}
            <DisplayModifierComponent value={state.context.bonus?.value ?? 0} />
          </div>
          <div tw="mb-4">Starting gold: {state.context.money.gp} gp</div>
        </div>
      );
    default:
      return null;
  }
}

export default ChooseClass;
