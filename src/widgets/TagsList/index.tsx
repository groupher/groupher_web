/*
 * TagsList
 */

import type { FC } from 'react'

import type { TTag, TSizeTSM, TSpace } from '~/spec'
import SIZE from '~/const/size'

import Tooltip from '~/widgets/Tooltip'

import FoldList from './FoldList'
import List from './List'

import useSalon from './salon'

export type TProps = {
  items: TTag[]
  max?: number
  size?: TSizeTSM
} & TSpace

const TagsList: FC<TProps> = ({ items, max = 3, size = SIZE.TINY, ...spacing }) => {
  const s = useSalon(spacing)

  if (items.length < max) {
    return (
      <div className={s.wrapper}>
        <List items={items} size={size} max={max} {...spacing} />
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      <Tooltip
        placement="bottom"
        content={
          <div className={s.popover}>
            <List items={items} size={size} max={max} {...spacing} />
          </div>
        }
      >
        {items.length > 0 && <FoldList items={items} size={size} {...spacing} />}
      </Tooltip>
    </div>
  )
}

export default TagsList
