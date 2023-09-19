/*
 *
 * ArrowLinker
 *
 */

import { FC, memo, ReactNode } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'

import { Link } from '@/widgets/Common'

import { Wrapper, Title, ArrowIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArrowLinker:index')

type TProps = {
  testid?: string
  href?: string
  fontSize?: number
  children: ReactNode
  target?: string
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  fontSize = 13,
  href = '/',
  target = '_blank',
  children,
  ...restProps
}) => {
  return (
    <Link href={href} target={target}>
      <Wrapper testid={testid} {...restProps}>
        <Title fontSize={fontSize}>{children}</Title>
        <ArrowIcon fontSize={fontSize} />
      </Wrapper>
    </Link>
  )
}

export default memo(ArrowLinker)
