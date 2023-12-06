import { FC } from 'react'

import TagNode from '@/widgets/TagNode'
import { COLOR_NAME } from '@/constant/colors'

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
  Divider,
  Footer,
  Previous,
  StarIcon,
  StarIcon2,
  StarIcon3,
} from '../../../styles/articles_intro_tabs/changelog_feat/changelog_demo/main_list'

const MainList: FC = () => {
  return (
    <Wrapper>
      <StarIcon />
      <StarIcon2 />
      <StarIcon3 />
      <Header>
        <Title>
          AI 加持的用户侧搜索 <Version>v2.0</Version>
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
      <Cover />
      <Content>
        <Bar height={6} width={159} right={7} opacity={0.3} />
        <Bar height={6} width={100} opacity={0.2} />
      </Content>
      <Footer>
        <Bar height={6} width={30} opacity={0.3} />
        <Bar height={6} width={50} opacity={0.2} />
      </Footer>
      <Divider />
      <Previous>
        <Header>
          <Title>
            文章支持视频发布 <Version>v1.9</Version>
          </Title>

          <TagsWrapper>
            <TagsWrapper>
              <TagItem>
                <TagNode
                  color={COLOR_NAME.GREEN}
                  hashSize={10}
                  hashRight={4}
                  opacity={0.6}
                  boldHash
                />
                Web
              </TagItem>

              <TagItem>
                <TagNode
                  color={COLOR_NAME.PINK}
                  hashSize={10}
                  hashRight={4}
                  opacity={0.6}
                  boldHash
                />
                编辑器
              </TagItem>
            </TagsWrapper>
          </TagsWrapper>
        </Header>
        <Content>
          <Bar height={6} width={159} right={7} opacity={0.3} />
          <Bar height={6} width={100} opacity={0.2} />
        </Content>
        <Footer>
          <Bar height={6} width={30} opacity={0.3} />
          <Bar height={6} width={50} opacity={0.2} />
        </Footer>
      </Previous>
    </Wrapper>
  )
}

export default MainList
