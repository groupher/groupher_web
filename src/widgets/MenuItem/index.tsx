/*
 *
 * MenuItem
 *
 */

import { type FC, memo } from 'react'

import MENU from '@/const/menu'

import type { TMenu } from '@/spec'
import { Wrapper, Title, MenuIcon, DeleteTitle } from './styles'

type TProps = {
  icon: TMenu
  title: string
  onClick?: () => void
}

const MenuItem: FC<TProps> = ({ title, icon, onClick = console.log }) => {
  const Icon = MenuIcon[icon]

  return (
    <Wrapper onClick={onClick}>
      <Icon />
      {icon === MENU.DELETE ? <DeleteTitle>{title}</DeleteTitle> : <Title>{title}</Title>}
    </Wrapper>
  )
}

export default memo(MenuItem)
