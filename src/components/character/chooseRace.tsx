import React, { Fragment } from 'react'
import { Race } from '../../races'
import RaceCard from './raceCard'

interface ChooseRaceProps {
  races: Race[]
}

function ChooseRace({ races }: ChooseRaceProps) {
  return (
    <Fragment>
      {races.map(r => (
        <></>
      ))}
    </Fragment>
  )
}

export default ChooseRace
