/*
 *
 * ImgFallback for avatar
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'
import { getLetterColor } from '@/utils/color'
import useAvatarLayout from '@/hooks/useAvatarLayout'

import type { TAvatarProps as TProps } from '.'
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
}) => {
  const avatarLayout = useAvatarLayout()

  const name = user?.nickname
  const sliceCount = size >= 30 ? 2 : 1

  const color = getLetterColor(name)

  return (
    <Wrapper
      className={className}
      color={color}
      testid={testid}
      size={size}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      $avatarLayout={avatarLayout}
    >
      <Name size={size} color={color}>
        {name.slice(0, sliceCount)}
      </Name>
    </Wrapper>
  )
}

export default memo(Avatar)
