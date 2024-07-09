import type { FC } from 'react'

import {
  Wrapper,
  Icon,
  Item,
  Title,
  ColorBall,
} from '../../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/editor_preview/toolbox'

const EditorToolbox: FC = () => {
  return (
    <Wrapper>
      <Item>
        <Icon.Rotate />
        <Title>旋转</Title>
      </Item>
      <Item>
        <Icon.Arch />
        <Title>弧度</Title>
      </Item>
      <Item>
        <Icon.Shadow />
        <Title>阴影</Title>
      </Item>
      <Item>
        <Icon.Position />
        <Title>位置</Title>
      </Item>
      <Item>
        <Icon.Size />
        <Title>大小</Title>
      </Item>
      <Item>
        <Icon.Light />
        <Title>灯光</Title>
      </Item>
      <Item>
        <Icon.Ratio />
        <Title>比例</Title>
      </Item>
      <Item>
        <ColorBall />
        <Title>背景</Title>
      </Item>
    </Wrapper>
  )
}

export default EditorToolbox
