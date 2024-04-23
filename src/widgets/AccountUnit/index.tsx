/*
 *
 * AccountUnit
 *
 */

import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { includes } from 'ramda'
import { signOut } from 'next-auth/react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import useAccount from '@/hooks/useAccount'
import useAvatarLayout from '@/hooks/useAvatarLayout'
import useBannerLayout from '@/hooks/useBannerLayout'
import { BANNER_LAYOUT } from '@/constant/layout'

import ImgFallback from '@/widgets/ImgFallback'
import { SpaceGrow } from '@/widgets/Common'
import ThemeSwitch from '@/widgets/ThemeSwitch'

import Panel from './Panel'

import { NormalWrapper, WithBgWrapper, Avatar, UnloginIcon, NickName, UnLoginText } from './styles'

const _log = buildLog('c:AccountUnit:index')

type TProps = {
  withName?: boolean
} & TSpace

const AccountUnit: FC<TProps> = ({ withName = false, ...restProps }) => {
  const user = useAccount()
  console.log('## useAccount: ', user)
  const { isLogin, avatar, nickname } = user
  const avatarLayout = useAvatarLayout()
  const bannerLayout = useBannerLayout()

  const [showPanel, setShowPanel] = useState(false)

  const Wrapper = includes(bannerLayout, [BANNER_LAYOUT.TABBER, BANNER_LAYOUT.SIDEBAR])
    ? WithBgWrapper
    : NormalWrapper

  return (
    <Wrapper {...restProps}>
      {includes(bannerLayout, [BANNER_LAYOUT.HEADER, BANNER_LAYOUT.TABBER]) && (
        <ThemeSwitch right={10} />
      )}
      {isLogin ? (
        <Avatar
          src={avatar}
          $avatarLayout={avatarLayout}
          fallback={<ImgFallback size={18} user={user} />}
          onClick={() => {
            console.log('## sign out')
            // signOut()
          }}
        />
      ) : (
        <UnloginIcon
          onClick={() => {
            setShowPanel(true)
          }}
        />
      )}
      {!isLogin && withName && <UnLoginText>未登入</UnLoginText>}
      {isLogin && withName && <NickName>{nickname}</NickName>}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && (
        <>
          <SpaceGrow />
          <ThemeSwitch />
        </>
      )}
      <Panel
        show={showPanel}
        onClose={() => {
          setShowPanel(false)
        }}
      />
    </Wrapper>
  )
}

export default observer(AccountUnit)
