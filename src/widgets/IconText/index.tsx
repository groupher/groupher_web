/*
 *
 * IconText
 *
 */

import { type FC, type ReactNode, memo } from 'react'

import type { TSize } from '@/spec'
import { ICON } from '@/config'
import { nilOrEmpty } from '@/validator'
import SIZE from '@/const/size'

import { Wrapper, Icon, Text } from './styles'

type TProps = {
  iconSrc?: string | null
  path?: string | null
  round?: boolean
  children: ReactNode
  size?: TSize
  margin?: string
  className?: string
  dimWhenIdle?: boolean
}

const IconText: FC<TProps> = ({
  className = '',
  iconSrc = null,
  path = null,
  round = false,
  children,
  size = SIZE.SMALL,
  dimWhenIdle = false,
  margin,
}) => {
  const src = iconSrc || `${ICON}/${path}`

  return (
    <Wrapper $testid="iconText" className={className} dimWhenIdle={dimWhenIdle}>
      {!nilOrEmpty(src) && <Icon src={src} size={size} $round={round} margin={margin} />}
      <Text size={size}>{children}</Text>
    </Wrapper>
  )
}

export default memo(IconText)
