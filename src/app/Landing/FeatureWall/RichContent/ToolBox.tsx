import { FC } from 'react'

import {
  Wrapper,
  Item,
  IconWrapper,
  Title,
  ICON,
} from '../../styles/feature_wall/rich_content/tool_box'

type TProps = {
  hovering: boolean
}

const ToolBox: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $hovering={hovering}>
      <Item>
        <IconWrapper>
          <ICON.Title />
        </IconWrapper>
        <Title>标题</Title>
      </Item>
      <Item $active>
        <IconWrapper>
          <ICON.Image />
        </IconWrapper>
        <Title $active>图片</Title>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Code />
        </IconWrapper>
        <Title>代码块</Title>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Table />
        </IconWrapper>
        <Title>表格</Title>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Quote />
        </IconWrapper>
        <Title>引用</Title>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Video />
        </IconWrapper>
        <Title>嵌入视频</Title>
      </Item>
    </Wrapper>
  )
}

export default ToolBox
