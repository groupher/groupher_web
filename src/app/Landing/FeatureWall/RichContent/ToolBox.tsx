import type { FC } from 'react'

import {
  Wrapper,
  Item,
  IconWrapper,
  Title,
  Icon,
} from '../../styles/feature_wall/rich_content/tool_box'

type TProps = {
  hovering: boolean
}

const ToolBox: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $hovering={hovering}>
      <Item>
        <IconWrapper>
          <Icon.Title />
        </IconWrapper>
        <Title>标题</Title>
      </Item>
      <Item $active>
        <IconWrapper>
          <Icon.Image />
        </IconWrapper>
        <Title $active>图片</Title>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Code />
        </IconWrapper>
        <Title>代码块</Title>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Table />
        </IconWrapper>
        <Title>表格</Title>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Quote />
        </IconWrapper>
        <Title>引用</Title>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Video />
        </IconWrapper>
        <Title>嵌入视频</Title>
      </Item>
    </Wrapper>
  )
}

export default ToolBox
