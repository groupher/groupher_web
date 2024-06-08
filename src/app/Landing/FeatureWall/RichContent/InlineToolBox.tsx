import type { FC } from 'react'

import {
  Wrapper,
  Item,
  IconWrapper,
  Icon,
} from '../../styles/feature_wall/rich_content/inline_tool_box'

type TProps = {
  hovering: boolean
}

const InlineToolBox: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $hovering={hovering}>
      <Item>
        <IconWrapper>
          <Icon.Bold />
        </IconWrapper>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Strike />
        </IconWrapper>
      </Item>
      <Item>
        <IconWrapper>
          <Icon.Link />
        </IconWrapper>
      </Item>
      <Item $active>
        <IconWrapper>
          <Icon.Highlight />
        </IconWrapper>
      </Item>
    </Wrapper>
  )
}

export default InlineToolBox
