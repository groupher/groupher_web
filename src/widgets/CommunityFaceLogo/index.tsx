/*
 *
 * CommunityFaceLogo
 *
 */

import { FC, memo } from 'react'

import { HCN } from '@/constant/name'
// import { ICON_BASE } from '@/config'
import { buildLog } from '@/utils/logger'

import { Logo } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:CommunityFaceLogo:index')

type TProps = {
  noFill?: boolean
  src?: string
  slug?: string
  className?: string
  noLazy?: boolean
}

const CommunityFaceLogo: FC<TProps> = ({
  noFill = false,
  src = '',
  slug = HCN,
  className = 'community-facelogo-class',
  noLazy = false,
}) => {
  return <Logo noFill={noFill} src={src} className={className} noLazy={noLazy} />
}

export default memo(CommunityFaceLogo)
