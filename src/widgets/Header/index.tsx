/*
 *
 * Header
 *
 */

import type { FC } from 'react'
import useMobileDetect from '@groupher/use-mobile-detect-hook'

import type { TMetric, TCommunity, TAccount } from '@/spec'
import { ANCHOR } from '@/const/dom'

import DesktopView from './DesktopView'

import { Wrapper, MobileWrapper } from './styles'

export type TProps = {
  metric: TMetric
  community?: TCommunity
  accountInfo: TAccount
}

const HeaderContainer: FC<TProps> = (props) => {
  const { isMobile } = useMobileDetect()

  return (
    <Wrapper id={ANCHOR.GLOBAL_HEADER_ID} $testid="">
      {!isMobile ? <DesktopView {...props} /> : <MobileWrapper />}
    </Wrapper>
  )
}

export default HeaderContainer
