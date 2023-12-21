import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import useHover from '@/hooks/useHover'

import Panel from './Panel'
import { Wrapper, Footer, Title, Desc } from '../../styles/feature_wall/rich_content'

const RichContent: FC = () => {
  const [cardRef, isCardHovered] = useHover<HTMLDivElement>()

  return (
    <Wrapper ref={cardRef} $color={COLOR_NAME.BLUE}>
      <Panel hovering={isCardHovered} />
      <Footer>
        <Title>富文本内容</Title>
        <Desc>支持主流富文本内容，兼容 Markdown。</Desc>
      </Footer>
    </Wrapper>
  )
}

export default RichContent
