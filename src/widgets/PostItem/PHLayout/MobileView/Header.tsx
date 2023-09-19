import { FC } from 'react'

import type { TPost } from '@/spec'

import EVENT from '@/constant/event'
import { send } from '@/signal'

import CommentsCount from '@/widgets/CommentsCount'

import { Wrapper, Brief, Title } from '../../styles/ph_layout/mobile_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  // const gotoArticle = useCallback(() => {
  //   Router.push(`/${ARTICLE_THREAD.POST}/${article.id}`)
  // }, [article.id])

  return (
    <Wrapper>
      <Brief>
        <Title
          onClick={(e) => {
            // make page can open by user right click the menu
            e.preventDefault()
            send(EVENT.PREVIEW_ARTICLE, { article })
          }}
          href={`/post/${article.id}`}
        >
          {article.title}
        </Title>
        {/*  @ts-ignore */}
      </Brief>

      {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} top={-5} />}
    </Wrapper>
  )
}

export default Header
