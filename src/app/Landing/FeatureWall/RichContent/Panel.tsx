import type { FC } from 'react'

import { SpaceGrow } from '~/widgets/Common'

import ToolBox from './ToolBox'
import InlineToolBox from './InlineToolBox'

import {
  Wrapper,
  Mention,
  Content,
  Header,
  Text,
  DemoPic,
  Highlight,
  MarkdownIcon,
} from '../../styles/feature_wall/rich_content/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <Content>
        <InlineToolBox hovering={hovering} />
        <ToolBox hovering={hovering} />
        <Header>
          <Mention>@老大</Mention>
          <SpaceGrow />
        </Header>
        <Text>
          {hovering ? <Highlight $color="CYAN">推进器</Highlight> : <>推进器</>}
          设计有点问题：
        </Text>
        <DemoPic src="landing/starship.png" />
        <MarkdownIcon />
      </Content>
    </Wrapper>
  )
}

export default Panel
