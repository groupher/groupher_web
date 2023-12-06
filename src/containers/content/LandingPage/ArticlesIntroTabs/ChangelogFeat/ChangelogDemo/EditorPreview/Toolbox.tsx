import { FC } from 'react'

import {
  Wrapper,
  ICON,
  Item,
  Title,
  ColorBall,
} from '../../../../styles/articles_intro_tabs/changelog_feat/changelog_demo/editor_preview/toolbox'

const EditorToolbox: FC = () => {
  return (
    <Wrapper>
      <Item>
        <ICON.Rotate />
        <Title>旋转</Title>
      </Item>
      <Item>
        <ICON.Arch />
        <Title>弧度</Title>
      </Item>
      <Item>
        <ICON.Shadow />
        <Title>阴影</Title>
      </Item>
      <Item>
        <ICON.Position />
        <Title>位置</Title>
      </Item>
      <Item>
        <ICON.Size />
        <Title>大小</Title>
      </Item>
      <Item>
        <ICON.Light />
        <Title>灯光</Title>
      </Item>
      <Item>
        <ICON.Ratio />
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
