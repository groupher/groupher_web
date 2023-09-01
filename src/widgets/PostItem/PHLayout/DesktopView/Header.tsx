import { FC } from 'react'
import dynamic from 'next/dynamic'

import type { TPost } from '@/spec'

import EVENT from '@/constant/event'
import { send } from '@/utils/signal'

import { Wrapper, Brief, Title } from '../../styles/ph_layout/desktop_view/header'

const TagsList = dynamic(() => import('@/widgets/TagsList'), {
  ssr: false,
})

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
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
        <TagsList items={article.articleTags} left={12} />
      </Brief>
    </Wrapper>
  )
}

export default Header
