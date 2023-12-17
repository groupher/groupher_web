/*
 *
 * EmptyLabel
 *
 */

import { FC, memo } from 'react'

import type { TSizeSML } from '@/spec'

import { ICON_CMD } from '@/config'
import SIZE from '@/constant/size'
import { buildLog } from '@/logger'

import { Wrapper, Icon, Title } from './styles'

const _log = buildLog('w:EmptyLabel:index')

type TProps = {
  iconSrc?: string
  size?: TSizeSML
  text?: string
}

const EmptyLabel: FC<TProps> = ({
  text = '啥子都没得 ...',
  iconSrc = `${ICON_CMD}/planet_v2.svg`,
  size = SIZE.MEDIUM,
}) => (
  <Wrapper>
    <Icon src={iconSrc} size={size} />
    <Title size={size}>{text}</Title>
  </Wrapper>
)

export default memo(EmptyLabel)
