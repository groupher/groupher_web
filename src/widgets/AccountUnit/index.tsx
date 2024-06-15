/*
 *
 * AccountUnit
 *
 */

import { type FC, useState } from 'react'
import { includes } from 'ramda'

import type { TSpace } from '@/spec'

import useSyncAccount from '@/hooks/useSyncAccount'
import useAccount from '@/hooks/useAccount'
import useLayout from '@/hooks/useLayout'
import { BANNER_LAYOUT } from '@/const/layout'

import { SpaceGrow } from '@/widgets/Common'

import LoggedInAccount from './LoggedInAccount'
import Panel from './Panel'

import {
  NormalWrapper,
  WithBgWrapper,
  HoverBox,
  UnloginIcon,
  NickName,
  UnLoginText,
} from './styles'

type TProps = {
  withName?: boolean
} & TSpace

const AccountUnit: FC<TProps> = ({ withName = false, ...restProps }) => {
  useSyncAccount()
  const user = useAccount()

  const { isLogin, nickname } = user
  const { bannerLayout } = useLayout()

  const [showPanel, setShowPanel] = useState(false)

  const Wrapper = includes(bannerLayout, [BANNER_LAYOUT.TABBER, BANNER_LAYOUT.SIDEBAR])
    ? WithBgWrapper
    : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {/* {includes(bannerLayout, [BANNER_LAYOUT.HEADER, BANNER_LAYOUT.TABBER]) && (
        <ThemeSwitch right={10} />
      )} */}
      {isLogin ? (
        <HoverBox>
          <LoggedInAccount />
        </HoverBox>
      ) : (
        <HoverBox onClick={() => setShowPanel(true)}>
          <UnloginIcon />
        </HoverBox>
      )}
      {!isLogin && withName && <UnLoginText>未登入</UnLoginText>}
      {isLogin && withName && <NickName>{nickname}</NickName>}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SpaceGrow />}
      <Panel show={showPanel} onClose={() => setShowPanel(false)} />
    </Wrapper>
  )
}

export default AccountUnit
