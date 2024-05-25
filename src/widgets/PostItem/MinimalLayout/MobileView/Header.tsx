import { FC } from 'react'

import type { TPost } from '@/spec'
import EVENT from '@/const/event'
import SIZE from '@/const/size'
import { send } from '@/signal'

import { SpaceGrow } from '@/widgets/Common'
import CommentsCount from '@/widgets/CommentsCount'

import { Wrapper, Main, Title } from '../../styles/minimal_layout/mobile_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { commentsCount } = article

  return (
    <Wrapper>
      <Main>
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
        <SpaceGrow />
        {/*  @ts-ignore */}
        {commentsCount !== 0 && <CommentsCount count={commentsCount} size={SIZE.MEDIUM} />}
      </Main>
    </Wrapper>
  )
}

export default Header
