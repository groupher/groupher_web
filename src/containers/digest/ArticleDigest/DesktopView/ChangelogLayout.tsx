/*
 * ChangelogLayout
 */

import { FC, memo } from 'react'
import Router from 'next/router'

import type { TChangelog, TMetric } from '@/spec'
import METRIC from '@/constant/metric'
import { ARTICLE_THREAD } from '@/constant/thread'

import { buildLog } from '@/utils/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import { SpaceGrow } from '@/widgets/Common'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'

// import ArticleBelongCommunity from '@/widgets/ArticleBelongCommunity'
// import ArticleMenu from '@/widgets/ArticleMenu'
// import BackTo from './BackTo'

import {
  Wrapper,
  BackBtnWrapper,
  ArrowIcon,
  Topping,
  Title,
  SubTitle,
  Avatar,
  AuthorName,
  BottomInfo,
} from '../styles/desktop_view/changelog_layout'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

type TProps = {
  article: TChangelog
  metric?: TMetric
}

const ChangelogLayout: FC<TProps> = ({ metric = METRIC.ARTICLE, article }) => {
  const { id, author, title } = article
  const backUrl = `/${article.originalCommunitySlug}/${ARTICLE_THREAD.CHANGELOG}`

  return (
    <Wrapper metric={metric}>
      <Topping>
        <BackBtnWrapper onClick={() => Router.push(backUrl)}>
          <ArrowIcon />
          更新日志
        </BackBtnWrapper>
        <SpaceGrow />
      </Topping>
      <Title>
        {title}
        <SubTitle>{id}</SubTitle>
      </Title>
      <BottomInfo>
        <AuthorName href="/">
          <Avatar src={author.avatar} />
          {author.nickname}
        </AuthorName>
        <ArticleBaseStats article={article} />
        {/* <ArticleMenu article={article} /> */}
      </BottomInfo>
    </Wrapper>
  )
}

export default memo(ChangelogLayout)
