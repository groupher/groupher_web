import type { FC } from 'react'

import { sortByColor } from '~/helper'
import { Trans } from '~/i18n'

import TagNode from '~/widgets/TagNode'

import type { TProps as TTagProps } from '.'

import { getDotSize, getIconSize, getDotMargin, getHashMargin } from './salon/metric'
import useSalon from './salon'

type TProps = Omit<TTagProps, 'withSetter' | 'max' | 'community' | 'thread'>

const FullList: FC<TProps> = ({ items, size, ...spacing }) => {
  const s = useSalon(spacing)

  const dotSize = getDotSize(size)
  const hashSize = getIconSize(size)
  const dotRight = getDotMargin(size)
  const hashRight = getHashMargin(size)

  return (
    <div className={s.wrapper}>
      {sortByColor(items).map((tag) => (
        <div className={s.tag} key={tag.slug}>
          <TagNode
            color={tag.color}
            dotSize={dotSize}
            hashSize={hashSize}
            dotRight={dotRight}
            hashRight={hashRight}
          />
          <div className={s.title}>{Trans(tag.title)}</div>
        </div>
      ))}
    </div>
  )
}

export default FullList
