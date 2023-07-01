// import { FC } from 'react'

import { Cell } from 'rsuite-table'
import TimeAgo from 'timeago-react'

import { previewArticle } from '@/utils/signal'

import Checker from '@/widgets/Checker'
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
import { batchSelect } from '../../logic'

export const CheckCell = ({ rowData, ...props }) => {
  // const { cat, state } = rowData
  const { id, _checked } = rowData

  return (
    <Cell {...props}>
      <Checker
        checked={_checked}
        size="small"
        top={5}
        onChange={(checked) => batchSelect(id, checked)}
      />
    </Cell>
  )
}

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
        <ArticleTitle onClick={() => previewArticle(rowData)}>{rowData.title}</ArticleTitle>
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
