/*
 *
 * CommunityFaceLogo
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import { buildLog } from '@/logger'

import { Logo } from './styles'

const _log = buildLog('w:CommunityFaceLogo:index')

type TProps = {
  noFill?: boolean
  src?: string
  className?: string
  noLazy?: boolean
  fallback?: ReactNode
}

const CommunityFaceLogo: FC<TProps> = ({
  noFill = false,
  src = '',
  className = 'community-facelogo-class',
  fallback = null,
  noLazy = false,
}) => {
  return (
    <Logo noFill={noFill} src={src} className={className} noLazy={noLazy} fallback={fallback} />
  )
}

export default memo(CommunityFaceLogo)
