import type { FC } from 'react'

import TagNode from '~/widgets/TagNode'
import { COLOR_NAME } from '~/const/colors'

import Toolbox from './Toolbox'
import CoverPreview from '../CoverPreview'

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
} from '../../../../styles/articles_intro_tabs/changelog_tab/changelog_demo/editor_preview'

const EditorPreview: FC = () => {
  return (
    <Wrapper>
      <Header>
        <Title>
          船新封面图编辑器 <Version>v2.0</Version>
        </Title>

        <TagsWrapper>
          <TagItem>
            <TagNode color={COLOR_NAME.GREEN} boldHash />
            Web
          </TagItem>

          <TagItem>
            <TagNode color={COLOR_NAME.ORANGE} boldHash />
            Mobile
          </TagItem>
        </TagsWrapper>
      </Header>
      <Cover>
        <CoverPreview />
      </Cover>
      <Toolbox />
      <Content>
        <Bar height={6} width={159} right={7} opacity={0.15} />
        <Bar height={6} width={100} opacity={0.1} />
        <Bar height={6} width={60} opacity={0.1} />
      </Content>
    </Wrapper>
  )
}

export default EditorPreview
