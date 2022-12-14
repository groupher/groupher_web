import { FC, memo } from 'react'

import type { TSpace } from '@/spec'
import FaqList from '@/widgets/FaqList'

import { Wrapper } from './styles/faq_layout'

type TProps = {
  testid?: string
} & TSpace

const FaqLayout: FC<TProps> = ({ testid = 'FaqLayout', ...restProps }) => {
  return (
    <Wrapper {...restProps}>
      <FaqList mode="collapse" />
    </Wrapper>
  )
}

export default memo(FaqLayout)
