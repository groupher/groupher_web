/*
 *
 * Header
 *
 */

import type { FC } from 'react'

import type { TMetric, TCommunity, TAccount } from '~/spec'
import { ANCHOR } from '~/const/dom'

import DesktopView from './DesktopView'

import { Wrapper } from './styles'

export type TProps = {
  metric: TMetric
  community?: TCommunity
  accountInfo: TAccount
}

const HeaderContainer: FC<TProps> = (props) => {
  return (
    <Wrapper id={ANCHOR.GLOBAL_HEADER_ID} $testid="">
      <DesktopView {...props} />
    </Wrapper>
  )
}

export default HeaderContainer
