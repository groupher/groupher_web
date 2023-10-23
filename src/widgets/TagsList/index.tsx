/*
 * TagsList
 */

import { FC, memo } from 'react'

import type { TTag, TSizeTSM, TSpace } from '@/spec'
import useTagLayout from '@/hooks/useTagLayout'
import SIZE from '@/constant/size'
import { TAG_LAYOUT } from '@/constant/layout'

import { sortByColor } from '@/helper'
import { Trans } from '@/i18n'
import { buildLog } from '@/logger'
import Tooltip from '@/widgets/Tooltip'

import FullList from './FullList'

import { Wrapper, Tag, HashSign, DotSign, Title, More } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:TagsList:index')

export type TProps = {
  items: TTag[]
  max?: number
  size?: TSizeTSM
} & TSpace

const TagsList: FC<TProps> = ({ items, max = 2, size = SIZE.TINY, ...restProps }) => {
  const tagLayout = useTagLayout()

  if (items.length > max) {
    return (
      <Wrapper {...restProps}>
        {sortByColor(items)
          .slice(0, max)
          .map((tag) => (
            <Tag key={tag.title}>
              {tagLayout === TAG_LAYOUT.DOT ? (
                <DotSign color={tag.color} size={size} />
              ) : (
                <HashSign color={tag.color} size={size} />
              )}
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
