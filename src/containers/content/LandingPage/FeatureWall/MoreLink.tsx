import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import type { TFeatType } from '../spec'
import { Wrapper } from '../styles/feature_wall/more_link'

type TProps = {
  title?: string
  href: string
  featType: TFeatType
}

const LINK_COLOR = {
  DISCUSS: COLOR_NAME.PURPLE,
  CHANGELOG: COLOR_NAME.RED,
  HELP: COLOR_NAME.GREEN,
  KANBAN: COLOR_NAME.BLUE,
}

const MoreLink: FC<TProps> = ({ title = '了解更多', href, featType }) => {
  return (
    <Wrapper href={href}>
      <ArrowButton color={LINK_COLOR[featType]}>{title}</ArrowButton>
    </Wrapper>
  )
}

export default MoreLink
