/*
 *
 * ImgFallback for avatar
 *
 */

import type { FC } from 'react'

import { getLetterColor } from '@/utils/color'
import useLayout from '@/hooks/useLayout'

import type { TAvatarProps as TProps } from '.'
import { Wrapper, Name } from './styles/avatar'

const Avatar: FC<TProps> = ({
  testid = 'avatar-fallback',
  className = '',
  size = 15,
  title = '',
  user = {},
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  quote = false,
}) => {
  const { avatarLayout } = useLayout()

  const name = user?.login || title || '?'
  const sliceCount = size >= 30 ? 2 : 1

  const color = getLetterColor(name)

  return (
    <Wrapper
      className={className}
      color={color}
      $testid={testid}
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

export default Avatar
