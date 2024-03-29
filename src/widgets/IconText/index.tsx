/*
 *
 * IconText
 *
 */

import { FC, ReactNode, memo } from 'react'

import type { TSize } from '@/spec'
import { ICON } from '@/config'
import { nilOrEmpty } from '@/validator'
import { buildLog } from '@/logger'
import SIZE from '@/constant/size'

import { Wrapper, Icon, Text } from './styles'

const _log = buildLog('w:IconText:index')

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
