import { FC, memo } from 'react'
import { useRouter } from 'next/router'

import { ROUTE } from '@/constant'

import { Wrapper, Title } from '../styles/bottom_bar/main_block_info'

const MainBlockInfo: FC = () => {
  const router = useRouter()
  const { pathname, asPath } = router

  if (pathname === `/${ROUTE.COOL_GUIDE}`) {
    return (
      <Wrapper>
        <Title href={asPath}>酷导航</Title>
      </Wrapper>
    )
  }

  if (pathname === `/${ROUTE.HAVE_A_DRINK}`) {
    return (
      <Wrapper>
        <Title href={asPath}>来一杯</Title>
      </Wrapper>
    )
  }

  if (pathname === `/${ROUTE.MEETUPS}`) {
    return (
      <Wrapper>
        <Title href={asPath}>小聚</Title>
      </Wrapper>
    )
  }

  if (pathname === `/${ROUTE.EXPLORE}`) {
    return (
      <Wrapper>
        <Title href={asPath}>发现</Title>
      </Wrapper>
    )
  }

  if (pathname === `/${ROUTE.PLAZA}`) {
    return (
      <Wrapper>
        <Title href={asPath}>作品集市</Title>
      </Wrapper>
    )
  }

  if (pathname === '/works/[id]') {
    return (
      <Wrapper>
        <Title href={`/${ROUTE.PLAZA}`}>作品集市</Title>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Title href="/">首页</Title>
    </Wrapper>
  )
}

export default memo(MainBlockInfo)
