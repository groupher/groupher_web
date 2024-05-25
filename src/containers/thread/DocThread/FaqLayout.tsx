import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import { DOC_FAQ_LAYOUT } from '@/const/layout'

import FaqList from '@/widgets/FaqList'

import { Wrapper } from './styles/faq_layout'

type TProps = TSpace

const FaqLayout: FC<TProps> = ({ ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <FaqList layout={DOC_FAQ_LAYOUT.COLLAPSE} />
    </Wrapper>
  )
}

export default memo(FaqLayout)
