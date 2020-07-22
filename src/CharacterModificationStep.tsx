/** @jsx jsx */
import { jsx } from '@emotion/core'
import { h2Style } from './styles/globalStyles'
import ChooseRace from './components/character/chooseRace'
import { playerRaces } from './races'
import { Machine } from 'xstate'
import { useMachine } from '@xstate/react'
import RaceCard from './components/character/raceCard'

interface CharacterModificationStepProps {
  name: string
}

const choiceMachine = Machine({
  id: 'choice',
  initial: 'idle',
  states: {
    idle: {
      on: { CHOICE_MADE: 'chosen' },
    },
    chosen: {
      type: 'final',
    },
  },
})

function CharacterModificationStep({ name }: CharacterModificationStepProps) {
  const [state, send] = useMachine(choiceMachine)

  return (
    <div>
      <h2 css={[h2Style]}>
        {name} - {state.value}
      </h2>
      {playerRaces.map(pr => (
        <RaceCard race={pr}></RaceCard>
      ))}
      <button onClick={() => send('CHOICE_MADE')}>Choose</button>
    </div>
  )
}

export default CharacterModificationStep
