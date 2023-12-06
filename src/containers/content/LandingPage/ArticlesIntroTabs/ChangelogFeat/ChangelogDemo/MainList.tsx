import { FC } from 'react'

import TagNode from '@/widgets/TagNode'
import { COLOR_NAME } from '@/constant/colors'
import { mockUsers } from '@/mock'

import Upvote from '@/widgets/Upvote'
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
  Divider,
  Footer,
  UpvoteWrapper,
  PublishDate,
  Previous,
  StarIcon,
  StarIcon2,
  StarIcon3,
} from '../../../styles/articles_intro_tabs/changelog_feat/changelog_demo/main_list'

const MainList: FC = () => {
  const users = mockUsers(3)

  return (
    <Wrapper>
      <StarIcon />
      <StarIcon2 />
      <StarIcon3 />
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
      <Content>
        <Bar height={6} width={159} right={7} opacity={0.3} />
        <Bar height={6} width={100} opacity={0.2} />
      </Content>
      <Footer>
        <UpvoteWrapper>
          <Upvote avatarList={users} type="general" viewerHasUpvoted count={34} />
        </UpvoteWrapper>
        <PublishDate>2013-12-01</PublishDate>
      </Footer>
      <Divider />
      <Previous>
        <Header>
          <Title>
            AI 加持的文章搜索 <Version>v1.9</Version>
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
          <UpvoteWrapper>
            <Upvote avatarList={users} type="general" count={122} />
          </UpvoteWrapper>
          <PublishDate>2013-11-25</PublishDate>
        </Footer>
      </Previous>
    </Wrapper>
  )
}

export default MainList
