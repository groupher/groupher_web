import { type FC, useCallback, lazy, Suspense } from 'react'

import type { TTabItem } from '~/spec'
import useSalon from '../styles/tabs/tab_icon'

type TProps = {
  item: TTabItem
  clickableRef: {
    current: HTMLElement
  }
  active: boolean
}

export const LocalIcon = lazy(() => import('./LocalIcon'))

const TabIcon: FC<TProps> = ({ item, clickableRef, active }) => {
  const s = useSalon()
  const { icon } = item

  const IconCmp = icon && (
    <Suspense fallback={null}>
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

  return (
    <div className={s.wrapper} onClick={handleClick}>
      {IconCmp}
    </div>
  )
}

export default TabIcon
