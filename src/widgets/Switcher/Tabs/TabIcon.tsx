import { type FC, useCallback, lazy, Suspense } from 'react'

import type { TTabItem } from '~/spec'
import { Wrapper } from '../styles/tabs/tab_icon'

type TProps = {
  item: TTabItem
  clickableRef: {
    current: HTMLElement
  }
  active: boolean
}

export const LocalIcon = lazy(() => import('./LocalIcon'))

const TabIcon: FC<TProps> = ({ item, clickableRef, active }) => {
  const { icon } = item

  const IconCmp = icon && (
    <Suspense fallback={null}>
      // @ts-ignore
      <LocalIcon slug={icon as string} active={active} small={false} />
    </Suspense>
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
