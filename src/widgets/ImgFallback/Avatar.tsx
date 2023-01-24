/*
 *
 * ImgFallback for avatar
 *
 */

import { FC, memo } from 'react'

import { AVATAR_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/utils/logger'

import type { TAvatarProps as TProps } from './index'
import { Wrapper, Name } from './styles/avatar'

/* eslint-disable-next-line */
const log = buildLog('w:ImgFallback:Avatar')

const Avatar: FC<TProps> = ({
  testid = 'avatar-fallback',
  className = '',
  size = 15,
  user = {
    nickname: '?',
  },
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  quote = false,
  avatarLayout = AVATAR_LAYOUT.SQUARE,
}) => {
  const name = user?.nickname
  const sliceCount = size >= 30 ? 2 : 1

  return (
    <Wrapper
      className={className}
      testid={testid}
      size={size}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      quote={quote}
      avatarLayout={avatarLayout}
    >
      <Name size={size}>{name.slice(0, sliceCount)}</Name>
    </Wrapper>
  )
}

export default memo(Avatar)
