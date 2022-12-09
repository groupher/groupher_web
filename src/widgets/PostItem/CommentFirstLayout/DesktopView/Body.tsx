import { FC, Fragment } from 'react'
import dynamic from 'next/dynamic'
import { includes } from 'ramda'
import TimeAgo from 'timeago-react'

import type { TCommunity, TPost } from '@/spec'
import { EVENT, ARTICLE_CAT, ARTICLE_STATE } from '@/constant'
import { send, changeToCommunity } from '@/utils/signal'

import { Space, SpaceGrow } from '@/widgets/Common'
// import CommunityCard from '@/widgets/Cards/CommunityCard'
// import UserCard from '@/widgets/Cards/UserCard'
import Tooltip from '@/widgets/Tooltip'
import ArticleCatState from '@/widgets/ArticleCatState'
import CommentsCount from '@/widgets/CommentsCount'
import ViewsCount from '@/widgets/ViewsCount'

import ActiveBadge from './ActiveBadge'

import {
  Wrapper,
  Digest,
  Footer,
  Dot,
  PublishTime,
  Extra,
  LeftPart,
  CommunityLabel,
  LabelDivider,
  AuthorName,
  ArticleStateBadgeWrapper,
} from '../../styles/comment_fist_layout/desktop_view/body'

const CommunityCard = dynamic(() => import('@/widgets/Cards/CommunityCard'), {
  ssr: false,
})

const UserCard = dynamic(() => import('@/widgets/Cards/UserCard'), {
  ssr: false,
})

type TProps = {
  curCommunity: TCommunity | null
  article: TPost
}

const Body: FC<TProps> = ({ article, curCommunity }) => {
  const { originalCommunity, author } = article
  const showOriginalCommunity = curCommunity === null || curCommunity.raw !== originalCommunity.raw

  const demoList = ['239', '231', '227', '228', '226', '225']
  return (
    <Wrapper>
      <Extra>
        <LeftPart>
          {showOriginalCommunity && (
            <Fragment>
              <Tooltip
                //  @ts-ignore
                content={<CommunityCard article={originalCommunity} />}
                placement="right"
                delay={1500}
              >
                <CommunityLabel onClick={() => changeToCommunity(originalCommunity.raw)}>
                  {originalCommunity.title}
                </CommunityLabel>
              </Tooltip>
              <LabelDivider />
            </Fragment>
          )}
        </LeftPart>
        <SpaceGrow />
        <ActiveBadge article={article} />
      </Extra>

      <Digest onClick={() => send(EVENT.PREVIEW_ARTICLE, { article })}>{article.digest}</Digest>
      <Footer>
        <ArticleStateBadgeWrapper>
          {article.id === '239' && <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={18} />}
          {article.id === '231' && <ArticleCatState cat={ARTICLE_CAT.BUG} right={18} />}
          {article.id === '227' && (
            <ArticleCatState cat={ARTICLE_CAT.BUG} state="TODO" right={18} />
          )}
          {article.id === '228' && (
            <ArticleCatState cat={ARTICLE_CAT.FEATURE} state="WIP" right={18} />
          )}
          {article.id === '226' && (
            <ArticleCatState cat={ARTICLE_CAT.QUESTION} state="RESOLVE" right={18} />
          )}
          {article.id === '225' && (
            <ArticleCatState
              cat={ARTICLE_CAT.FEATURE}
              state={ARTICLE_STATE.REJECT_DUP}
              right={18}
            />
          )}
        </ArticleStateBadgeWrapper>
        {!includes(article.id, demoList) && (
          <ArticleCatState cat={ARTICLE_CAT.FEATURE} right={18} />
        )}

        <ViewsCount count={article.views} />
        <Space right={18} />
        {article.commentsCount !== 0 && <CommentsCount count={article.commentsCount} />}
      </Footer>
    </Wrapper>
  )
}

export default Body
