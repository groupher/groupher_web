import { FC } from 'react'

import useHover from '@/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/rich_content'

const RichContent: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>富文本内容</Title>
        <Desc>发布内容或评论支持常见的富文本格式。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default RichContent
