/** @jsx jsx */
import { jsx } from '@emotion/core'
import tw from 'twin.macro'
import React, { Fragment } from 'react'

interface ParagraphsProps {
  paragraphs: string
}

function Paragraphs({ paragraphs }: ParagraphsProps) {
  return (
    <Fragment>
      {paragraphs.split('\n').map(para => (
        <p>{para}</p>
      ))}
    </Fragment>
  )
}

export default Paragraphs
