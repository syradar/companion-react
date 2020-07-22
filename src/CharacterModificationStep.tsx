/** @jsx jsx */
import { jsx } from '@emotion/core'
import tw, { css } from 'twin.macro'
import { h2Style, btnPrimary } from './styles/globalStyles'
import ChooseRace from './components/character/chooseRace'
import { playerRaces, Race } from './races'
import { Machine, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import RaceCard from './components/character/raceCard'
import { Fragment } from 'react'

interface CharacterModificationStepProps {
  name: string
  onChoice: (data: Race) => void
}

interface ChoiceContext {
  data: Race | undefined
}

const choiceMachine = Machine<ChoiceContext>({
  id: 'choice',
  initial: 'idle',
  context: {
    data: undefined,
  },
  states: {
    idle: {
      on: {
        CHOICE_MADE: {
          target: 'chosen',
          actions: assign({
            data: (context, event) => (context.data = event.data),
          }),
        },
      },
    },
    chosen: {
      type: 'final',
      entry: 'notifyChoice',
    },
  },
})

function CharacterModificationStep({
  name,
  onChoice,
}: CharacterModificationStepProps) {
  const [state, send] = useMachine(choiceMachine, {
    actions: {
      notifyChoice: ctx => onChoice(ctx.data as Race),
    },
  })

  return (
    <div>
      {state.matches('idle') && (
        <Fragment>
          <h2 css={[h2Style]}>{name}</h2>
          {playerRaces.map(pr => (
            <div tw="rounded shadow-lg p-4 mb-4">
              <RaceCard race={pr}></RaceCard>

              <button
                css={[btnPrimary]}
                onClick={() => send('CHOICE_MADE', { data: pr })}
              >
                Choose
              </button>
            </div>
          ))}
        </Fragment>
      )}
      {state.matches('chosen') && (
        <div tw="rounded shadow-lg p-4 mb-4">
          <RaceCard race={state.context.data as Race}></RaceCard>
        </div>
      )}
    </div>
  )
}

export default CharacterModificationStep
