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
  max-height: 0;
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
        <div tw="flex font-bold">{playerClass.name}</div>
        <button css={[btnSecondary]} onClick={() => send('TOGGLE')}>
          {state.matches('inactive') ? 'Show' : 'Hide'}
        </button>
      </div>
      <div aria-expanded={!state.matches('active')} css={[toggleCss]}>
        <h3 css={[h3Style]}>Racial Bonus</h3>
        <SeparatedList
          separator={' or '}
          values={playerClass.bonus}
          display={v => (
            <Fragment>
              <DisplayModifierComponent value={v.value} /> {v.tag}
            </Fragment>
          )}
        />
        <h3 css={[h3Style]}>Backgrounds</h3>
        <p>{playerClass.backgroundsExample}</p>
      </div>
    </div>
  );
}

export default ClassCard;
