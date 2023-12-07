import { FC } from 'react'

import type { TColor } from '@/spec'
import { COLOR_NAME } from '@/constant/colors'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import { Wrapper } from '../styles/articles_intro_tabs/more_link'

type TProps = {
  title?: string
  href: string
} & TColor

const MoreLink: FC<TProps> = ({ title = '了解更多', href, color }) => {
  return (
    <Wrapper href={href}>
      <ArrowButton color={color}>{title}</ArrowButton>
    </Wrapper>
  )
}

export default MoreLink
