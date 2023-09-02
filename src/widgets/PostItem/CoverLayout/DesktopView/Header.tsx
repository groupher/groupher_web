import { FC } from 'react'

import type { TPost } from '@/spec'
import { THREAD } from '@/constant/thread'
import useCurCommunity from '@/hooks/useCurCommunity'

import { Wrapper, Main, Title } from '../../styles/cover_layout/desktop_view/header'

type TProps = {
  article: TPost
}

const Header: FC<TProps> = ({ article }) => {
  const { slug } = useCurCommunity()

  const { innerId, title } = article

  return (
    <Wrapper>
      <Main>
        <Title onClick={(e) => e.preventDefault()} href={`/${slug}/${THREAD.POST}/${innerId}`}>
          {title}
        </Title>
      </Main>
    </Wrapper>
  )
}

export default Header
