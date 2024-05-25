import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import type { TPost } from '@/spec'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import { THREAD } from '@/const/thread'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'
import TagsList from '@/widgets/TagsList'

import { Wrapper, Brief, Title } from '../../styles/ph_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { innerId, title, articleTags } = article
  const { slug } = useViewingCommunity()

  return (
    <Wrapper>
      <Brief>
        <ArticleReadLabel viewed={article.viewerHasViewed} right={8} size={7} top={1} />
        <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
          {title}
        </Title>
        {/*  @ts-ignore */}
        <TagsList items={articleTags} left={12} />
      </Brief>
    </Wrapper>
  )
}

export default observer(Header)
