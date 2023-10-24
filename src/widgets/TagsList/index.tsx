/*
 * TagsList
 */

import { FC, memo } from 'react'

import type { TTag, TSizeTSM, TSpace } from '@/spec'
import SIZE from '@/constant/size'

import { sortByColor } from '@/helper'
import { Trans } from '@/i18n'
import { buildLog } from '@/logger'

import Tooltip from '@/widgets/Tooltip'
import TagNode from '@/widgets/TagNode'

import FullList from './FullList'

import { getDotSize, getIconSize, getDotMargin, getHashMargin } from './styles/metric'
import { Wrapper, Tag, Title, More } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:TagsList:index')

export type TProps = {
  items: TTag[]
  max?: number
  size?: TSizeTSM
} & TSpace

const TagsList: FC<TProps> = ({ items, max = 2, size = SIZE.TINY, ...restProps }) => {
  const dotSize = getDotSize(size)
  const hashSize = getIconSize(size)
  const dotRight = getDotMargin(size)
  const hashRight = getHashMargin(size)

  if (items.length > max) {
    return (
      <Wrapper {...restProps}>
        {sortByColor(items)
          .slice(0, max)
          .map((tag) => (
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
        <Tooltip placement="bottom" content={<FullList items={items} size={size} {...restProps} />}>
          <More>..</More>
        </Tooltip>
      </Wrapper>
    )
  }

  return (
    <Wrapper>{items.length > 0 && <FullList items={items} size={size} {...restProps} />}</Wrapper>
  )
}

export default memo(TagsList)
