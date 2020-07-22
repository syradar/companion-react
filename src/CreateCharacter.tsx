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

  const handleChoice = (data: {}) => console.log(data)

  return (
    <Fragment>
      <h1 css={[h1Style]}>Create Character</h1>

      {steps.map((s, index) => (
        <CharacterModificationStep
          key={index}
          name={s.name}
          onChoice={handleChoice}
        />
      ))}
    </Fragment>
  )
}

export default CreateCharacter
