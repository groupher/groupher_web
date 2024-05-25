/*
 *
 * MenuItem
 *
 */

import { FC, memo } from 'react'

import MENU from '@/const/menu'
import { buildLog } from '@/logger'

import type { TMenu } from '@/spec'
import { Wrapper, Title, MenuIcon, DeleteTitle } from './styles'

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
      {icon === MENU.DELETE ? <DeleteTitle>{title}</DeleteTitle> : <Title>{title}</Title>}
    </Wrapper>
  )
}

export default memo(MenuItem)
