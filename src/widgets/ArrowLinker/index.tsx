/*
 *
 * ArrowLinker
 *
 */

import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react'

import type { TSpace } from '@/spec'
import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

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
  bold?: boolean
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  fontSize = 13,
  href = '/',
  target = '_blank',
  bold = false,
  children,
  ...restProps
}) => {
  const primaryColor = usePrimaryColor()

  return (
    <Link href={href} target={target}>
      <Wrapper testid={testid} {...restProps}>
        <Title fontSize={fontSize} bold={bold} primaryColor={primaryColor}>
          {children}
        </Title>
        <ArrowIcon fontSize={fontSize} primaryColor={primaryColor} />
      </Wrapper>
    </Link>
  )
}

export default observer(ArrowLinker)
