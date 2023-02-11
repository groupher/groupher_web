import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { HELP_FAQ_LAYOUT } from '@/constant/layout'

import FaqList from '@/widgets/FaqList'

import { Wrapper } from './styles/faq_layout'

type TProps = {
  testid?: string
} & TSpace

const FaqLayout: FC<TProps> = ({ testid = 'FaqLayout', ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <FaqList layout={HELP_FAQ_LAYOUT.FAQ_COLLAPSE} />
    </Wrapper>
  )
}

export default memo(FaqLayout)
