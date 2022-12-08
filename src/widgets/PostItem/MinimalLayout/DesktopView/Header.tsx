import { FC } from 'react'

import type { TPost } from '@/spec'
import { SIZE, EVENT } from '@/constant'
import { send } from '@/utils/signal'

import { SpaceGrow } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'
import CommentsCount from '@/widgets/CommentsCount'

import {
  Wrapper,
  Main,
  Title,
} from '../../styles/minimal_layout/desktop_view/header'

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
          {article.title}{' '}
        </Title>
        {/*  @ts-ignore */}
        <TagsList items={article.articleTags} left={12} />
        <SpaceGrow />
        {commentsCount !== 0 && (
          <CommentsCount count={commentsCount} size={SIZE.MEDIUM} />
        )}
      </Main>
    </Wrapper>
  )
}

export default Header
