/*
 *
 * GotoTop
 *
 */

import { FC, memo } from 'react'

import { scrollToHeader, scrollDrawerToTop } from '@/utils/dom'

import { Wrapper, AirBalloonIcon } from './styles'

export type TProps = {
  testid?: string
  type?: 'body' | 'drawer'
}

const GotoTop: FC<TProps> = ({ testid = 'goto-top', type = 'body' }) => {
  const handler = type === 'body' ? scrollToHeader : scrollDrawerToTop

  return (
    <Wrapper testid={testid} onClick={handler}>
      <AirBalloonIcon />
    </Wrapper>
  )
}

export default memo(GotoTop)
