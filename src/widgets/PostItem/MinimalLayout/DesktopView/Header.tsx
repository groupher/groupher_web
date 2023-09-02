import { FC } from 'react'

import type { TPost } from '@/spec'
import useCurCommunity from '@/hooks/useCurCommunity'
import SIZE from '@/constant/size'
import { THREAD } from '@/constant/thread'

import { SpaceGrow } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import { Wrapper, Main, Title } from '../../styles/minimal_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { slug } = useCurCommunity()
  const { innerId, title, commentsCount, articleTags } = article

  return (
    <Wrapper>
      <Main>
        <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
          {title}
        </Title>
        {/*  @ts-ignore */}
        <TagsList items={articleTags} left={12} />
        <SpaceGrow />
        {commentsCount !== 0 && <CommentsCount count={commentsCount} size={SIZE.MEDIUM} />}
      </Main>
    </Wrapper>
  )
}

export default Header
