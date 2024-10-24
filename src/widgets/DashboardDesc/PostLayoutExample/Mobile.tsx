import { type FC, memo } from 'react'

import type { TPost } from '~/spec'

import { Divider, Br } from '~/widgets/Common'
import MobileMockup from '~/widgets/MobileMockup'
import PostItem from '~/widgets/PostItem'

import { MobileWrapper, Title, SubTitle, Desc } from '../styles/post_layout_example'

type TProps = {
  articles: TPost[]
}

const Mobile: FC<TProps> = ({ articles }) => {
  return (
    <MobileWrapper>
      <Title>
        紧凑简洁
        <SubTitle>(默认)</SubTitle>
      </Title>
      <Desc>侧重展示标题与参与 Upvotes 的用户</Desc>
      <Divider />
      <MobileMockup>
        {articles.map((item) => (
          <PostItem key={item.id} article={item} isMobilePreview />
        ))}
      </MobileMockup>
      <Br bottom={80} />
      <Title>三段式</Title>
      <Desc>侧重展示发帖者与参与讨论的用户</Desc>
      <Divider />
      <MobileMockup>
        {articles.map((item) => (
          <PostItem key={item.id} article={item} isMobilePreview />
        ))}
      </MobileMockup>
    </MobileWrapper>
  )
}

export default memo(Mobile)
