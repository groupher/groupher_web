/*
 *
 * ImgFallback
 *
 */

import { FC, memo } from 'react'

import type { TUser, TSpace } from '@/spec'
import { buildLog } from '@/logger'

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
} & TSpace

type TProps = TAvatarProps

const ImgFallback: FC<TProps> = ({ ...restProps }) => {
  return <Avatar {...restProps} />
}

export default memo(ImgFallback)
