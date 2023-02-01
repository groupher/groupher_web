/*
 *
 * ImgFallback
 *
 */

import { FC, memo } from 'react'

import type { TUser, TSpace, TAvatarLayout } from '@/spec'
import { buildLog } from '@/utils/logger'

// import Work from './Work'
import Avatar from './Avatar'

/* eslint-disable-next-line */
const log = buildLog('w:ImgFallback:index')

export type TAvatarProps = {
  testid?: string
  className?: string
  user?: TUser
  size?: number
  quote?: boolean
  avatarLayout?: TAvatarLayout
} & TSpace

type TProps = {
  type?: 'avatar' | 'work'
} & TAvatarProps

const ImgFallback: FC<TProps> = ({ type = 'avatar', ...restProps }) => {
  return <Avatar {...restProps} />
}

export default memo(ImgFallback)
