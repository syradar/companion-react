/** @jsx jsx */
import { jsx } from '@emotion/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { css } from 'twin.macro';
import { Fragment } from 'react';
import { Race } from '../../models/races';
import { Machine } from 'xstate';
import { useMachine } from '@xstate/react';
import SeparatedList from '../../SeparatedList';
import DisplayModifierComponent from '../../DisplayModifierComponent';
import Paragraphs from '../../Paragraphs';
import FeatListComponent from '../../FeatListComponent';
import { h3Style, btnSecondary } from '../../styles/globalStyles';
import Heading from '../heading';

interface RaceCardProps {
  race: Race;
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

function RaceCard({ race }: RaceCardProps) {
  const [state, send] = useMachine(toggleMachine);
  return (
    <div tw="flex flex-col">
      <div tw="flex justify-between ">
        <Heading lvl={3}>{race.name}</Heading>
        <button css={[btnSecondary]} onClick={() => send('TOGGLE')}>
          {state.matches('inactive') ? 'Show' : 'Hide'}
        </button>
      </div>
      <div aria-expanded={state.matches('active')} css={[toggleCss]}>
        <div tw="mb-4">
          <Heading lvl={3}>Racial Bonus</Heading>
          <SeparatedList
            separator={' or '}
            values={race.bonus}
            display={v => (
              <Fragment>
                <DisplayModifierComponent value={v.value} /> {v.tag}
              </Fragment>
            )}
          />
        </div>
        {race.power.map((p, index) => (
          <div tw="mb-4" key={index}>
            <Heading lvl={3}>{p.name}</Heading>
            <div tw="mb-4" className="prose">
              {p.description && <Paragraphs paragraphs={p.description} />}
            </div>
            <FeatListComponent feats={p.feats} />
          </div>
        ))}

        <Heading lvl={3}>Racial Feats</Heading>
        <FeatListComponent feats={race.feats} />
      </div>
    </div>
  );
}

export default RaceCard;
