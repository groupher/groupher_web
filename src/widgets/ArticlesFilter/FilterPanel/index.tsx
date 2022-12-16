import { FC, memo } from 'react'

import type { TArticleFilter } from '@/spec'

// import LengthFilter from './LengthFilter'

import { Wrapper, Block, Icon, Title } from '../styles/filter_panel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FilterPanel: FC<TProps> = ({ activeFilter, onSelect }) => {
  return (
    <Wrapper>
      <Block>
        <Icon.ALL />
        <Title>默认</Title>
      </Block>
      <Block>
        <Icon.TIME />
        <Title>发布时间</Title>
      </Block>
      <Block>
        <Icon.UPVOTE />
        <Title>投票数</Title>
      </Block>
      <Block>
        <Icon.COMMENT />
        <Title>评论数</Title>
      </Block>
      <Block>
        <Icon.VIEW />
        <Title>浏览量</Title>
      </Block>
    </Wrapper>
  )
}

export default memo(FilterPanel)
