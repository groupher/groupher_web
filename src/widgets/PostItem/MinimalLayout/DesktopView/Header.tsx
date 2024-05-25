import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TPost } from '@/spec'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import SIZE from '@/const/size'
import { THREAD } from '@/const/thread'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import { SpaceGrow } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import { Wrapper, Main, Title } from '../../styles/minimal_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { slug } = useViewingCommunity()
  const { innerId, title, commentsCount, articleTags } = article

  return (
    <Wrapper>
      <Main>
        <ArticleReadLabel viewed={article.viewerHasViewed} right={8} top={2} />
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

export default observer(Header)
