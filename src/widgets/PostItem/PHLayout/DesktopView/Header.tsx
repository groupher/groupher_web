import { FC } from 'react'
import dynamic from 'next/dynamic'

import type { TPost } from '@/spec'
import useCurCommunity from '@/hooks/useCurCommunity'
import { THREAD } from '@/constant/thread'

import { Wrapper, Brief, Title } from '../../styles/ph_layout/desktop_view/header'

const TagsList = dynamic(() => import('@/widgets/TagsList'), {
  ssr: false,
})

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { innerId, title, articleTags } = article
  const { slug } = useCurCommunity()

  return (
    <Wrapper>
      <Brief>
        <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
          {title}
        </Title>
        {/*  @ts-ignore */}
        <TagsList items={articleTags} left={12} />
      </Brief>
    </Wrapper>
  )
}

export default Header
