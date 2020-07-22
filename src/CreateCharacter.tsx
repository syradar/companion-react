/** @jsx jsx */
import React, { Fragment } from 'react'
import tw, { css } from 'twin.macro'
import { jsx } from '@emotion/core'

import './App.css'
import { useRouteMatch, Link } from 'react-router-dom'
import { playerRaces } from './races'
import SeparatedList from './SeparatedList'
import DisplayModifierComponent from './DisplayModifierComponent'
import FeatListComponent from './FeatListComponent'
import Paragraphs from './Paragraphs'
import {
  ModifyCharacterStep,
  defaultModifyCharacterSteps,
} from './characterModification'
import CharacterModificationStep from './CharacterModificationStep'
import { h1Style } from './styles/globalStyles'

function CreateCharacter() {
  let match = useRouteMatch()

  const steps: ModifyCharacterStep[] = [...defaultModifyCharacterSteps]

  return (
    <Fragment>
      <h1 css={[h1Style]}>Create Character</h1>

      {steps.map(s => (
        <CharacterModificationStep name={s.name} />
      ))}

      {playerRaces.map(pr => (
        <div css={[tw`max-w-lg rounded overflow-hidden shadow-lg px-6 py-4`]}>
          <h2>{pr.name}</h2>
        </div>
      ))}
    </Fragment>
  )
}

export default CreateCharacter
