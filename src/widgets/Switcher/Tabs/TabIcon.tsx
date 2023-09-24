import { FC, useCallback } from 'react'
import dynamic from 'next/dynamic'

import type { TTabItem } from '@/spec'
import { Wrapper } from '../styles/tabs/tab_icon'

type TProps = {
  item: TTabItem
  clickableRef: {
    current: HTMLElement
  }
  active: boolean
}

export const LocalIcon = dynamic(() => import('./LocalIcon'), {
  ssr: false,
})

const TabIcon: FC<TProps> = ({ item, clickableRef, active }) => {
  const { icon } = item

  const IconCmp = icon && (
    // @ts-ignore
    <LocalIcon slug={icon} active={active} small={false} />
  )

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation()
      clickableRef.current.click()
    },
    [clickableRef],
  )

  return <Wrapper onClick={handleClick}>{IconCmp}</Wrapper>
}

export default TabIcon
