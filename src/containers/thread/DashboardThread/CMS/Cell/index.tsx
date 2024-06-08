// import type { FC } from 'react'

import { Cell } from 'rsuite-table'
import TimeAgo from 'timeago-react'

import { previewArticle } from '@/signal'
import { COMMUNITY_STATUS } from '@/const/mode'

import Checker from '@/widgets/Checker'
import ArticleCatState from '@/widgets/ArticleCatState'
import { Row } from '@/widgets/Common'
import TagsList from '@/widgets/TagsList'

// import { mockTags } from '@/mock'

import {
  ArticleWrapper,
  ArticleTitle,
  StateWrapper,
  DateCellWrapper,
  AuthorWrapper,
  AuthorAvatar,
  DateItem,
  Nickname,
  CommunityLogo,
  CommunityTitle,
  CommunitySlug,
  Pending,
  SwitchButton,
  ActionCell,
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
        <ArticleCatState cat={cat} state={state} left={-8} smaller />
      </StateWrapper>
    </Cell>
  )
}

export const CommunityCell = ({ rowData, ...props }) => {
  const { logo, title, slug } = rowData

  return (
    <Cell {...props}>
      <Row>
        <CommunityLogo src={logo} />
        <div>
          <CommunityTitle>{title}</CommunityTitle>
          <CommunitySlug href={`/${slug}`}>/{slug}</CommunitySlug>
        </div>
      </Row>
    </Cell>
  )
}

export const PendingCell = ({ rowData, ...props }) => {
  const { pending } = rowData

  const _pending = pending === COMMUNITY_STATUS.PENDING

  return (
    <Cell {...props} align="center">
      <ActionCell>
        <Pending blocked={_pending}>{_pending ? '待审核' : '正常'}</Pending>
        <SwitchButton size="tiny" ghost>
          开关
        </SwitchButton>
      </ActionCell>
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
  const { insertedAt, activeAt } = rowData

  return (
    <Cell {...props}>
      <DateCellWrapper>
        <DateItem>
          {/* <PublishIcon /> */}
          <TimeAgo datetime={insertedAt} locale="zh_CN" />
        </DateItem>
        <DateItem>
          <PulseIcon />
          <TimeAgo datetime={activeAt} locale="zh_CN" />
        </DateItem>
      </DateCellWrapper>
    </Cell>
  )
}

export const TimestampCell = ({ rowData, ...props }) => {
  const { insertedAt, updatedAt } = rowData
  if (insertedAt === updatedAt) {
    return (
      <Cell {...props}>
        <DateCellWrapper>
          <DateItem warn>
            <TimeAgo datetime={insertedAt} locale="zh_CN" />
          </DateItem>
        </DateCellWrapper>
      </Cell>
    )
  }

  return (
    <Cell {...props}>
      <DateCellWrapper>
        <DateItem>
          {/* <PublishIcon /> */}
          <TimeAgo datetime={insertedAt} locale="zh_CN" />
        </DateItem>
        <DateItem>
          <PulseIcon />
          <TimeAgo datetime={updatedAt} locale="zh_CN" />
        </DateItem>
      </DateCellWrapper>
    </Cell>
  )
}
