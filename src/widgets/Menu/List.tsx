import type { FC } from 'react'

import type { TMenuItem } from './spec'
import Item from './Item'
import useSalon from './salon/list'

type TProps = {
  items: TMenuItem[]
  activeKey: string
  onSelect: (item: TMenuItem) => void
  popWidth: number
  withDesc: boolean
}

const List: FC<TProps> = ({ items, activeKey, onSelect, popWidth, withDesc }) => {
  const s = useSalon({ popWidth })

  if (withDesc) {
    return (
      <div className={s.wrapper}>
        {items.map((item) => (
          <Item
            key={item.key}
            withDesc={withDesc}
            item={item}
            active={activeKey === item.key}
            onClick={() => onSelect(item)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      {items.map((item) => {
        const active = activeKey === item.key

        return <Item key={item.key} item={item} active={active} onClick={() => onSelect(item)} />
      })}
    </div>
  )
}

export default List
