// import { FC } from 'react'

import { Cell } from 'rsuite-table'
import TimeAgo from 'timeago-react'

import ArticleCatState from '@/widgets/ArticleCatState'
import TagsList from '@/widgets/TagsList'

// import { mockTags } from '@/utils/mock'

import {
  ArticleWrapper,
  ArticleTitle,
  StateWrapper,
  DateCellWrapper,
  AuthorWrapper,
  AuthorAvatar,
  DateItem,
  Nickname,
  // PublishIcon,
  PulseIcon,
} from '../../styles/cms/cell'

export const StateCell = ({ rowData, ...props }) => {
  const { cat, state } = rowData

  return (
    <Cell {...props}>
      <StateWrapper>
        <ArticleCatState cat={cat} state={state} left={-8} smaller noBg />
      </StateWrapper>
    </Cell>
  )
}

export const ArticleCell = ({ rowData, ...props }) => {
  return (
    <Cell {...props}>
      <ArticleWrapper>
        <ArticleTitle>{rowData.title}</ArticleTitle>
        <TagsList items={rowData.articleTags} left={0} />
      </ArticleWrapper>
    </Cell>
  )
}

export const AuthorDateCell = ({ rowData, ...props }) => {
  return (
    <Cell {...props}>
      <AuthorWrapper>
        <AuthorAvatar src={rowData.author.avatar} />
        <Nickname>{rowData.author.nickname}</Nickname>
      </AuthorWrapper>
    </Cell>
  )
}

export const DateCell = ({ rowData, ...props }) => {
  return (
    <Cell {...props}>
      <DateCellWrapper>
        <DateItem>
          {/* <PublishIcon /> */}
          <TimeAgo datetime={rowData.insertedAt} locale="zh_CN" />
        </DateItem>
        <DateItem>
          <PulseIcon />
          <TimeAgo datetime={rowData.activeAt} locale="zh_CN" />
        </DateItem>
      </DateCellWrapper>
    </Cell>
  )
}
