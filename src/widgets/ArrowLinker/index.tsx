/*
 *
 * ArrowLinker
 *
 */

import { FC, ReactNode } from 'react'
import { observer } from 'mobx-react-lite'

import type { TColorName, TSpace } from '@/spec'
import { buildLog } from '@/logger'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Link } from '@/widgets/Common'

import { Wrapper, Title, ArrowIcon } from './styles'

const _log = buildLog('c:ArrowLinker:index')

type TProps = {
  testid?: string
  href?: string
  fontSize?: number
  children: ReactNode
  target?: string
  bold?: boolean
  color?: TColorName | null
} & TSpace

const ArrowLinker: FC<TProps> = ({
  testid = 'arrow-linker',
  fontSize = 13,
  href = '/',
  target = '_blank',
  bold = false,
  color = null,
  children,
  ...restProps
}) => {
  const primaryColor = color || usePrimaryColor()

  return (
    <Link href={href} target={target}>
      <Wrapper $testid={testid} $color={primaryColor} {...restProps}>
        <Title fontSize={fontSize} bold={bold} $color={primaryColor}>
          {children}
        </Title>
        <ArrowIcon fontSize={fontSize} $color={primaryColor} />
      </Wrapper>
    </Link>
  )
}

export default observer(ArrowLinker)
