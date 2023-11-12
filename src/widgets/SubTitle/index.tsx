/*
 *
 * SubTitle
 *
 */

import { FC, memo, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import { buildLog } from '@/logger'
import ArrowButton from '@/widgets/Buttons/ArrowButton'

import { Wrapper, Title, OptionWrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:SubTitle:index')

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
    <Wrapper testid={testid}>
      <Title>{children}</Title>
      <OptionWrapper>
        {withMore && <ArrowButton onClick={() => router.push(moreLink)}>更多</ArrowButton>}
      </OptionWrapper>
    </Wrapper>
  )
}

export default memo(SubTitle)
