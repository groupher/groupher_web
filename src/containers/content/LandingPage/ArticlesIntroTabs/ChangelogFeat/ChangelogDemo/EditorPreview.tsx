import { FC } from 'react'

import TagNode from '@/widgets/TagNode'
import { COLOR_NAME } from '@/constant/colors'

import CoverPreview from './CoverPreview'

import {
  Wrapper,
  Header,
  Title,
  Version,
  Bar,
  Cover,
  TagsWrapper,
  TagItem,
  Content,
  Footer,
  Toolbox,
  ToolItem,
  ToolName,
  ArchIcon,
  RatioIcon,
  BlocksIcon,
  ShadowIcon,
  RotateIcon,
  LightIcon,
  SizeIcon,
  ColorBall,
} from '../../../styles/articles_intro_tabs/changelog_feat/changelog_demo/editor_preview'

const EditorPreview: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Title>
          文章封面图编辑器 <Version>v2.0</Version>
        </Title>

        <TagsWrapper>
          <TagItem>
            <TagNode color={COLOR_NAME.GREEN} hashSize={10} hashRight={4} opacity={0.6} boldHash />
            Web
          </TagItem>

          <TagItem>
            <TagNode color={COLOR_NAME.ORANGE} hashSize={10} hashRight={4} opacity={0.6} boldHash />
            Mobile
          </TagItem>
        </TagsWrapper>
      </Header>
      <Cover>
        <CoverPreview />
      </Cover>
      <Toolbox>
        <ToolItem>
          <RotateIcon />
          <ToolName>旋转</ToolName>
        </ToolItem>
        <ToolItem>
          <ArchIcon />
          <ToolName>弧度</ToolName>
        </ToolItem>
        <ToolItem>
          <ShadowIcon />
          <ToolName>阴影</ToolName>
        </ToolItem>
        <ToolItem>
          <BlocksIcon />
          <ToolName>位置</ToolName>
        </ToolItem>
        <ToolItem>
          <SizeIcon />
          <ToolName>大小</ToolName>
        </ToolItem>
        <ToolItem>
          <LightIcon />
          <ToolName>灯光</ToolName>
        </ToolItem>
        <ToolItem>
          <RatioIcon />
          <ToolName>比例</ToolName>
        </ToolItem>
        <ToolItem>
          <ColorBall />
          <ToolName>背景</ToolName>
        </ToolItem>
      </Toolbox>
      <Content>
        <Bar height={6} width={159} right={7} opacity={0.1} />
        <Bar height={6} width={100} opacity={0.2} />
      </Content>
      <Footer>
        <Bar height={6} width={30} opacity={0.3} />
        <Bar height={6} width={50} opacity={0.2} />
      </Footer>
    </Wrapper>
  )
}

export default EditorPreview
