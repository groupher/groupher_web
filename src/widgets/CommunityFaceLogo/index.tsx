/*
 *
 * CommunityFaceLogo
 *
 */

import { type FC, memo, type ReactNode } from 'react'

import { Logo } from './styles'

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
