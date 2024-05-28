import { type FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { HOME_COMMUNITY } from '@/const/name'

import { GroupherLogo } from './styles'

type TProps = {
  size: number
} & TSpace

const HomeLogo: FC<TProps> = ({ size, ...restProps }) => {
  return <GroupherLogo src={HOME_COMMUNITY.logo} $size={size} {...restProps} />
}

export default memo(HomeLogo)
