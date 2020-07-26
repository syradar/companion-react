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
import {
  PlayerClass,
  armorTableToTable,
  meleeWeaponsToTable,
  rangedWeaponsToTable,
} from '../../models/classes';
import Heading from '../heading';
import { replaceZeroWithDash } from '../../functions';
import Table from '../table';

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
        <Table rows={armorTableToTable(playerClass.armorTable)}></Table>
        <Heading lvl={4}>Melee Weapons</Heading>
        <Table rows={meleeWeaponsToTable(playerClass.meleeWeapons)}></Table>
        <Heading lvl={4}>Ranged Weapons</Heading>
        <Table rows={rangedWeaponsToTable(playerClass.rangedWeapons)}></Table>
      </div>
    </div>
  );
}

export default ClassCard;
