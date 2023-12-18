/*
 *
 * CommunityFaceLogo
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/logger'

import { Logo } from './styles'

const _log = buildLog('w:CommunityFaceLogo:index')

type TProps = {
  noFill?: boolean
  src?: string
  className?: string
  noLazy?: boolean
}

const CommunityFaceLogo: FC<TProps> = ({
  noFill = false,
  src = '',
  className = 'community-facelogo-class',
  noLazy = false,
}) => {
  return <Logo noFill={noFill} src={src} className={className} noLazy={noLazy} />
}

export default memo(CommunityFaceLogo)
