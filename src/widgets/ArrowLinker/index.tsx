/*
 *
 * ArrowLinker
 *
 */

import type { FC, ReactNode } from 'react'

import type { TColorName, TSpace } from '@/spec'
import usePrimaryColor from '@/hooks/usePrimaryColor'

import { Link } from '@/widgets/Common'

import { Wrapper, Title, ArrowIcon } from './styles'

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

export default ArrowLinker
