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
  size?: number
  children: ReactNode
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  size = 13,
  href = '/',
  children,
  ...restProps
}) => {
  return (
    <Link href={href}>
      <Wrapper {...restProps}>
        <Title size={size}>{children}</Title>
        <ArrowIcon size={size} />
      </Wrapper>
    </Link>
  )
}

export default memo(ArrowLinker)
