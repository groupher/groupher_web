'use client'

import React from 'react'
import { Plate, PlateContent } from '@udecode/plate-common'

import { Wrapper } from './styles'

const BasicEditorDefaultDemo = () => {
  return (
    <Wrapper>
      <Plate onChange={(data) => console.log('## onChange: ', data)}>
        <PlateContent placeholder="Type..." />
      </Plate>
    </Wrapper>
  )
}

export default BasicEditorDefaultDemo
