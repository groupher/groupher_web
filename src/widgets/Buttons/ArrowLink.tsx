/*
 *
 * ArrowLink
 *
 */

import { type FC, type ReactNode, memo } from 'react'

import type { TSize } from '~/spec'
import SIZE from '~/const/size'

import { Wrapper, Text, RightIcon } from './styles/arrow_link'

type TProps = {
  className?: string
  children?: ReactNode
  size?: TSize
  href: string
  target?: '_blank' | ''
  color?: string
  hoverColor?: string
}

const ArrowLink: FC<TProps> = ({
  className = '',
  children = '下一步',
  size = SIZE.SMALL,
  href = '',
  target = '_blank',
  color = '',
  hoverColor = '',
}) => {
  return (
    <Wrapper className={className} href={href} rel="noopener noreferrer" target={target}>
      <Text size={size} color={color} $hoverColor={hoverColor}>
        {children}
      </Text>
      <RightIcon size={size} color={color} $hoverColor={hoverColor} />
    </Wrapper>
  )
}

export default memo(ArrowLink)
