import { FC } from 'react'

import ArrowButton from '@/widgets/Buttons/ArrowButton'
import { Wrapper } from './styles/top_info'

const TopInfo: FC = () => {
  return (
    <Wrapper>
      <ArrowButton leftLayout>编辑器</ArrowButton>
      <ArrowButton>三方集成</ArrowButton>
    </Wrapper>
  )
}

export default TopInfo
