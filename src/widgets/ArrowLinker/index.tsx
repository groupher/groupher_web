/*
 *
 * ArrowLinker
 *
 */

import { FC, memo, ReactNode } from 'react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/utils/logger'

import { Link } from '@/widgets/Common'

import { Wrapper, Title, ArrowIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:ArrowLinker:index')

type TProps = {
  testid?: string
  href?: string
  fontSize?: number
  children: ReactNode
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  fontSize = 13,
  href = '/',
  children,
  ...restProps
}) => {
  return (
    <Link href={href}>
      <Wrapper testid={testid} {...restProps}>
        <Title fontSize={fontSize}>{children}</Title>
        <ArrowIcon fontSize={fontSize} />
      </Wrapper>
    </Link>
  )
}

export default memo(ArrowLinker)
