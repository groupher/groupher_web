import { FC } from 'react'

import {
  Wrapper,
  Item,
  IconWrapper,
  ICON,
} from '../../styles/feature_wall/rich_content/inline_tool_box'

type TProps = {
  hovering: boolean
}

const InlineToolBox: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper $hovering={hovering}>
      <Item>
        <IconWrapper>
          <ICON.Bold />
        </IconWrapper>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Strike />
        </IconWrapper>
      </Item>
      <Item>
        <IconWrapper>
          <ICON.Link />
        </IconWrapper>
      </Item>
      <Item $active>
        <IconWrapper>
          <ICON.Highlight />
        </IconWrapper>
      </Item>
    </Wrapper>
  )
}

export default InlineToolBox
