import { FC } from 'react'
import { observer } from 'mobx-react'

import type { TPost } from '@/spec'
import { THREAD } from '@/constant/thread'
import useViewingCommunity from '@/hooks/useViewingCommunity'

import ArticleReadLabel from '@/widgets/ArticleReadLabel'

import { Wrapper, Main, Title } from '../../styles/cover_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { slug } = useViewingCommunity()

  const { innerId, title } = article

  return (
    <Wrapper>
      <Main>
        <ArticleReadLabel viewed={article.viewerHasViewed} top={2} right={8} />
        <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
          {title}
        </Title>
      </Main>
    </Wrapper>
  )
}

export default observer(Header)
