import { FC, memo } from 'react'

import useTagLayout from '@/hooks/useTagLayout'
import { sortByColor } from '@/helper'
import { Trans } from '@/i18n'
import { TAG_LAYOUT } from '@/constant/layout'

import type { TProps as TTagProps } from '.'

import { Wrapper, Tag, DotSign, HashSign, Title } from './styles'

type TProps = Omit<TTagProps, 'withSetter' | 'max' | 'community' | 'thread'>

const FullList: FC<TProps> = ({ items, size, ...restProps }) => {
  const tagLayout = useTagLayout()

  return (
    <Wrapper {...restProps}>
      {sortByColor(items).map((tag) => (
        <Tag key={tag.title}>
          {tagLayout === TAG_LAYOUT.DOT ? (
            <DotSign color={tag.color} size={size} />
          ) : (
            <HashSign color={tag.color} size={size} />
          )}

          <Title size={size}>{Trans(tag.title)}</Title>
        </Tag>
      ))}
    </Wrapper>
  )
}

export default memo(FullList)
