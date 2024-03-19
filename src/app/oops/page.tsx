'use client'

import { useRouter } from 'next/navigation'

import { ROUTE } from '@/constant/route'

import Button from '@/widgets/Buttons/Button'
import { LinkAble } from '@/widgets/Common'

import { Wrapper, InnerWrapper, Footer } from './styles'
// import ErrorPage from 'next/error'

const OopsPage = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <InnerWrapper>
        <h1>Oops</h1>
        <p>the content you looking for is not exist</p>
        <Footer>
          <Button type="primary" right={20} onClick={() => router.back()}>
            返回
          </Button>

          <LinkAble href={`/${ROUTE.HOME}`}>
            <Button ghost>Groupher 社区</Button>
          </LinkAble>
        </Footer>
      </InnerWrapper>
    </Wrapper>
  )
}

export default OopsPage
