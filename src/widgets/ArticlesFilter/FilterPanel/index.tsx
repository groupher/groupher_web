import { FC, memo } from 'react'

import type { TArticleFilter } from '@/spec'

// import LengthFilter from './LengthFilter'

import { Wrapper, Block, IconWrapper, Icon, Title } from '../styles/filter_panel'

type TProps = {
  activeFilter: TArticleFilter
  onSelect: (filter: TArticleFilter) => void
}

const FilterPanel: FC<TProps> = ({ activeFilter, onSelect }) => {
  return (
    <Wrapper>
      <Block>
        <IconWrapper>
          <Icon.ALL />
        </IconWrapper>
        <Title>默认排序</Title>
      </Block>
      <Block>
        <IconWrapper>
          <Icon.TIME />
        </IconWrapper>
        <Title>发布时间</Title>
      </Block>
      <Block>
        <IconWrapper>
          <Icon.UPVOTE />
        </IconWrapper>
        <Title>投票数</Title>
      </Block>
      <Block>
        <IconWrapper>
          <Icon.COMMENT />
        </IconWrapper>
        <Title>评论数</Title>
      </Block>
      <Block>
        <IconWrapper>
          <Icon.VIEW />
        </IconWrapper>
        <Title>浏览量</Title>
      </Block>
    </Wrapper>
  )
}

export default memo(FilterPanel)
