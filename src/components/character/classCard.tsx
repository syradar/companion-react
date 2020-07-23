/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { Fragment } from 'react';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import SeparatedList from '../../SeparatedList';
import DisplayModifierComponent from '../../DisplayModifierComponent';
import { h3Style, btnSecondary } from '../../styles/globalStyles';
import { PlayerClass } from '../../models/classes';
import Heading from '../heading';
import { replaceZeroWithDash } from '../../functions';
import '@tailwindcss/typography/dist/typography.min.css';

interface ClassCardProps {
  playerClass: PlayerClass;
}

const toggleMachine = Machine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: {
      on: { TOGGLE: 'active' },
    },
    active: {
      on: { TOGGLE: 'inactive' },
    },
  },
});

const toggleCss = css`
  /*max-height: 0;*/
  overflow: hidden;
  transition: max-height ease-out 150ms;

  &[aria-expanded='true'] {
    max-height: 1200px;
  }
`;

function ClassCard({ playerClass }: ClassCardProps) {
  const [state, send] = useMachine(toggleMachine);
  return (
    <div tw="flex flex-col">
      <div tw="flex justify-between ">
        <Heading lvl={3}>{playerClass.name}</Heading>
        <button css={[btnSecondary]} onClick={() => send('TOGGLE')}>
          {state.matches('inactive') ? 'Show' : 'Hide'}
        </button>
      </div>
      <div aria-expanded={state.matches('active')} css={[toggleCss]}>
        <Heading lvl={4}>Racial bonus</Heading>
        <div tw="mb-4">
          <SeparatedList
            separator={' or '}
            values={playerClass.bonus}
            display={v => (
              <Fragment>
                <DisplayModifierComponent value={v.value} /> {v.tag}
              </Fragment>
            )}
          />
        </div>
        <Heading lvl={4}>Backgrounds</Heading>
        <p tw="mb-4">{playerClass.backgroundsExample}</p>
        <Heading lvl={4}>Armor</Heading>
        <div className="prose" tw="mb-4">
          <table>
            <thead>
              <tr>
                <th>Armor Type</th>
                <th tw="text-right">Base AC</th>
                <th tw="text-right">Attack Penalty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{playerClass.armorTable.None.name}</td>
                <td tw="text-right">{playerClass.armorTable.None.baseAc}</td>
                <td tw="text-right">
                  {replaceZeroWithDash(
                    playerClass.armorTable.None.attackPenalty,
                  )}
                </td>
              </tr>
              <tr>
                <td>{playerClass.armorTable.Light.name}</td>
                <td tw="text-right">{playerClass.armorTable.Light.baseAc}</td>
                <td tw="text-right">
                  {replaceZeroWithDash(
                    playerClass.armorTable.Light.attackPenalty,
                  )}
                </td>
              </tr>
              <tr>
                <td>{playerClass.armorTable.Heavy.name}</td>
                <td tw="text-right">{playerClass.armorTable.Heavy.baseAc}</td>
                <td tw="text-right">
                  {replaceZeroWithDash(
                    playerClass.armorTable.Heavy.attackPenalty,
                  )}
                </td>
              </tr>
              <tr>
                <td>{playerClass.armorTable.Shield.name}</td>
                <td tw="text-right">+{playerClass.armorTable.Shield.baseAc}</td>
                <td tw="text-right">
                  {replaceZeroWithDash(
                    playerClass.armorTable.Shield.attackPenalty,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
