import { FC } from 'react'

import { Wrapper, ArrowIcon, Title } from '../styles/mobile_view/back_to'

const BackTo: FC = () => {
  return (
    <Wrapper>
      <ArrowIcon />
      <Title href="/">返回</Title>
    </Wrapper>
  )
}

export default BackTo
