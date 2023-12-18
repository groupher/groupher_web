/*
 *
 * DivideText
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@/logger'

import { Wrapper, Content, LeftLine, RightLine } from './styles'

const _log = buildLog('w:DivideText:index')

const DivideText = ({ testid, children }) => {
  return (
    <Wrapper $testid={testid}>
      <LeftLine />
      <Content>{children}</Content>
      <RightLine />
    </Wrapper>
  )
}

DivideText.propTypes = {
  testid: T.string,
  children: T.oneOfType([T.string, T.node]).isRequired,
}

DivideText.defaultProps = {
  testid: 'divide-text',
}

export default React.memo(DivideText)
