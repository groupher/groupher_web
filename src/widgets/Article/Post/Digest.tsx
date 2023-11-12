/*
 * PostLayout
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import useMetric from '@/hooks/useMetric'
import useViewingArticle from '@/hooks/useViewingArticle'
import usePrimaryColor from '@/hooks/usePrimaryColor'
import { ARTICLE_THREAD } from '@/constant/thread'

import { buildLog } from '@/logger'

// import ArchivedSign from '@/widgets/ArchivedSign'
import { SpaceGrow } from '@/widgets/Common'
import ArticleBaseStats from '@/widgets/ArticleBaseStats'
import Share from '@/widgets/Share'
import ArticleSettingMenu from '@/widgets/ArticleSettingMenu'
import ArticlePinLabel from '@/widgets/ArticlePinLabel'

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
} from '../styles/post/digest'

/* eslint-disable-next-line */
const log = buildLog('C:ArticleDigest')

const PostLayout: FC = () => {
  const router = useRouter()
  const metric = useMetric()
  const { article } = useViewingArticle()
  const primaryColor = usePrimaryColor()

  const { innerId, author, title, isPinned } = article

  const backUrl = `/${article.originalCommunitySlug}/${ARTICLE_THREAD.POST}`

  return (
    <Wrapper metric={metric}>
      <LeftPart>
        <Topping>
          <BackBtnWrapper onClick={() => router.push(backUrl)}>
            <ArrowIcon />
            讨论区
          </BackBtnWrapper>
          <SpaceGrow />
          <Share modalOffset="38%" />
          <ArticleSettingMenu left={16} />
        </Topping>

        <ArticlePinLabel isPinned={isPinned} top={56} />
        <Title $isPinned={isPinned} $color={primaryColor}>
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

export default observer(PostLayout)
