/*
 *
 * ImgFallback
 *
 */

import { type FC, memo } from 'react'

import type { TUser, TSpace } from '@/spec'

// import Work from './Work'
import Avatar from './Avatar'

export type TAvatarProps = {
  testid?: string
  className?: string
  user?: TUser
  title?: string
  size?: number
  quote?: boolean
} & TSpace

type TProps = TAvatarProps

const ImgFallback: FC<TProps> = ({ ...restProps }) => {
  return <Avatar {...restProps} />
}

export default memo(ImgFallback)
