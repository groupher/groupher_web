import { type FC, memo } from 'react'

import { sortByColor } from '@/helper'
import { Trans } from '@/i18n'

import TagNode from '@/widgets/TagNode'

import type { TProps as TTagProps } from '.'

import { getDotSize, getIconSize, getDotMargin, getHashMargin } from './styles/metric'
import { Wrapper, Tag, Title } from './styles'

type TProps = Omit<TTagProps, 'withSetter' | 'max' | 'community' | 'thread'>

const FullList: FC<TProps> = ({ items, size, ...restProps }) => {
  const dotSize = getDotSize(size)
  const hashSize = getIconSize(size)
  const dotRight = getDotMargin(size)
  const hashRight = getHashMargin(size)

  return (
    <Wrapper {...restProps}>
      {sortByColor(items).map((tag) => (
        <Tag key={tag.slug}>
          <TagNode
            color={tag.color}
            dotSize={dotSize}
            hashSize={hashSize}
            dotRight={dotRight}
            hashRight={hashRight}
          />
          <Title size={size}>{Trans(tag.title)}</Title>
        </Tag>
      ))}
    </Wrapper>
  )
}

export default memo(FullList)
