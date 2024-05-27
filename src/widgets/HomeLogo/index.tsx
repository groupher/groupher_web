import { type FC, memo } from 'react'

import type { TSpace } from '@/spec'

import { GroupherLogo } from './styles'

type TProps = {
  size: number
} & TSpace

const HomeLogo: FC<TProps> = ({ size, ...restProps }) => {
  return <GroupherLogo src="/groupher.png" $size={size} {...restProps} />
}

export default memo(HomeLogo)
