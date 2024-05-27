/*
 *
 * SubTitle
 *
 */

import { type FC, memo, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import ArrowButton from '@/widgets/Buttons/ArrowButton'

import { Wrapper, Title, OptionWrapper } from './styles'

type TProps = {
  testid?: string
  children: ReactNode
  withMore?: boolean
  moreLink?: string
}

const SubTitle: FC<TProps> = ({
  testid = 'subTitle',
  children,
  withMore = false,
  moreLink = '/',
}) => {
  const router = useRouter()
  return (
    <Wrapper $testid={testid}>
      <Title>{children}</Title>
      <OptionWrapper>
        {withMore && <ArrowButton onClick={() => router.push(moreLink)}>更多</ArrowButton>}
      </OptionWrapper>
    </Wrapper>
  )
}

export default memo(SubTitle)
