/*
 *
 * MenuItem
 *
 */

import { FC, memo } from 'react'

import { buildLog } from '@/utils/logger'

import type { TMenu } from '@/spec'
import { Wrapper, Title, MenuIcon } from './styles'

/* eslint-disable-next-line */
const log = buildLog('c:MenuItem:index')

type TProps = {
  icon: TMenu
  title: string
  onClick?: () => void
}

const MenuItem: FC<TProps> = ({ title, icon, onClick = log }) => {
  const Icon = MenuIcon[icon]

  return (
    <Wrapper onClick={onClick}>
      <Icon />
      <Title>{title}</Title>
    </Wrapper>
  )
}

export default memo(MenuItem)
