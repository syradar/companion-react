/** @jsx jsx */
import { jsx } from '@emotion/core'
import tw, { css } from 'twin.macro'
import React, { Fragment } from 'react'
import { Race } from '../../races'
import { Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import SeparatedList from '../../SeparatedList'
import DisplayModifierComponent from '../../DisplayModifierComponent'
import Paragraphs from '../../Paragraphs'
import FeatListComponent from '../../FeatListComponent'
import { h3Style } from '../../styles/globalStyles'

interface RaceCardProps {
  race: Race
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
})

const toggleCss = css`
  max-height: 0;
  overflow: hidden;

  &[aria-expanded='true'] {
    max-height: 1200px;
  }
`

function RaceCard({ race }: RaceCardProps) {
  const [state, send] = useMachine(toggleMachine)
  return (
    <div tw="rounded shadow-lg p-4 flex flex-col">
      <div tw="flex justify-between ">
        <div tw="flex font-bold">{race.name}</div>
        <button
          tw="px-4 py-2 bg-gray-300 rounded-full"
          onClick={() => send('TOGGLE')}
        >
          {state.matches('inactive') ? 'Show' : 'Hide'}
        </button>
      </div>
      <div aria-expanded={state.matches('active')} css={[toggleCss]}>
        <h3 css={[h3Style]}>Racial Bonus</h3>
        <SeparatedList
          separator={' or '}
          values={race.bonus}
          display={v => (
            <Fragment>
              <DisplayModifierComponent value={v.value} /> {v.tag}
            </Fragment>
          )}
        />
        {race.power.map((p, index) => (
          <Fragment key={index}>
            <h3 css={[h3Style]}>{p.name}</h3>
            {p.description && <Paragraphs paragraphs={p.description} />}
            <FeatListComponent feats={p.feats} />
          </Fragment>
        ))}

        <h3 css={[h3Style]}>Racial Feats</h3>
        <FeatListComponent feats={race.feats} />
      </div>
    </div>
  )
}

export default RaceCard
