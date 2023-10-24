/*
 * ChankgelogLayout
 */

import { FC, memo } from 'react'
import Router from 'next/router'

import type { TChangelog } from '@/spec'

import useMetric from '@/hooks/useMetric'
import { ARTICLE_THREAD } from '@/constant/thread'

import { buildLog } from '@/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import { SpaceGrow } from '@/widgets/Common'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'
import Share from '@/widgets/Share'
import ArticleSettingMenu from '@/widgets/ArticleSettingMenu'

// import ArticleBelongCommunity from '@/widgets/ArticleBelongCommunity'
// import ArticleMenu from '@/widgets/ArticleMenu'
// import BackTo from './BackTo'

import {
  Wrapper,
  BackBtnWrapper,
  ArrowIcon,
  LeftPart,
  Topping,
  Title,
  SubTitle,
  Avatar,
  AuthorName,
  BottomInfo,
} from '../styles/changelog/digest'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

type TProps = {
  article: TChangelog
}

const ChangelogLayout: FC<TProps> = ({ article }) => {
  const metric = useMetric()
  const { innerId, author, title } = article

  const backUrl = `/${article.originalCommunitySlug}/${ARTICLE_THREAD.CHANGELOG}`

  return (
    <Wrapper metric={metric}>
      <LeftPart>
        <Topping>
          <BackBtnWrapper onClick={() => Router.push(backUrl)}>
            <ArrowIcon />
            讨论区
          </BackBtnWrapper>
          <SpaceGrow />
          <Share modalOffset="38%" />
          <ArticleSettingMenu left={16} />
        </Topping>
        <Title>
          {title}
          <SubTitle>{innerId}</SubTitle>
        </Title>
        <BottomInfo>
          <AuthorName href="/">
            <Avatar src={author.avatar} />
            {author.nickname}
          </AuthorName>
          <ArticleBaseStats article={article} right={26} />
        </BottomInfo>
      </LeftPart>
    </Wrapper>
  )
}

export default memo(ChangelogLayout)
