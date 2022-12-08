import { FC } from 'react'

import type { TPost } from '@/spec'
import { EVENT } from '@/constant'
import { send } from '@/utils/signal'

import { Wrapper, Main, Title } from '../../styles/cover_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
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
      </Main>
    </Wrapper>
  )
}

export default Header
