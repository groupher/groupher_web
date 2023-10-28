/*
 *
 * AccountUnit
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react'
import { includes } from 'ramda'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'
import useAvatarLayout from '@/hooks/useAvatarLayout'
import useBannerLayout from '@/hooks/useBannerLayout'
import { BANNER_LAYOUT } from '@/constant/layout'

import { SpaceGrow } from '@/widgets/Common'
import ThemeSwitch from '@/widgets/ThemeSwitch'

import { NormalWrapper, WithBgWrapper, Avatar, UnloginIcon, NickName, UnLoginText } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:AccountUnit:index')

type TProps = {
  testid?: string
  withName?: boolean
} & TSpace

const AccountUnit: FC<TProps> = ({ testid = 'account-unit', withName = false, ...restProps }) => {
  const { isLogin, avatar, nickname } = useAccount()
  const avatarLayout = useAvatarLayout()
  const bannerLayout = useBannerLayout()

  const Wrapper = includes(bannerLayout, [BANNER_LAYOUT.TABBER, BANNER_LAYOUT.SIDEBAR])
    ? WithBgWrapper
    : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {includes(bannerLayout, [BANNER_LAYOUT.HEADER, BANNER_LAYOUT.TABBER]) && (
        <ThemeSwitch right={10} />
      )}

      {isLogin ? <Avatar src={avatar} $avatarLayout={avatarLayout} /> : <UnloginIcon />}
      {!isLogin && withName && <UnLoginText>未登入</UnLoginText>}
      {isLogin && withName && <NickName>{nickname}</NickName>}

      {bannerLayout === BANNER_LAYOUT.SIDEBAR && (
        <>
          <SpaceGrow />
          <ThemeSwitch />
        </>
      )}
    </Wrapper>
  )
}

export default observer(AccountUnit)
