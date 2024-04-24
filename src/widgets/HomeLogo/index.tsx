import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { GroupherLogo } from './styles'

const _log = buildLog('c:HomeLogo:index')

type TProps = {
  size: number
} & TSpace

const HomeLogo: FC<TProps> = ({ size, ...restProps }) => {
  return <GroupherLogo src="/groupher.png" $size={size} {...restProps} />
}

export default memo(HomeLogo)
