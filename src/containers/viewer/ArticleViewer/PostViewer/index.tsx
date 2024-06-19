/*
 * ArticleViewer
 */

import { type FC, Fragment, useCallback, useState, useEffect } from 'react'
import Balancer from 'react-wrap-balancer'

import type { TPost } from '@/spec'
import { scrollDrawerToTop } from '@/dom'
import { BROADCAST_ARTICLE_LAYOUT } from '@/const/layout'

import useBroadcast from '@/hooks/useBroadcast'

import ArticleFooter from '@/widgets/ArticleFooter'
import GotoTop from '@/widgets/GotoTop'
import ViewportTracker from '@/widgets/ViewportTracker'
import { ArticleContentLoading } from '@/widgets/Loading'
import ArticeBody from '@/widgets/ArtimentBody'
import ArticleBroadcast from '@/widgets/ArticleBroadcast'

import FixedHeader from './FixedHeader'
import Header from './Header'
import ArticleInfo from './ArticleInfo'

import {
  Wrapper,
  BodyWrapper,
  Title,
  TitleText,
  SubTitle,
  GoTopWrapper,
} from '../styles/post_viewer'

type TProps = {
  article: TPost
  loading: boolean
}

const PostViewer: FC<TProps> = ({ article, loading }) => {
  const broadcastConfig = useBroadcast()

  const [fixedHeaderVisible, setFixedHeaderVisible] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)

  useEffect(() => {
    scrollDrawerToTop()
  }, [])

  const hideFixedHeader = useCallback(() => setFixedHeaderVisible(false), [])
  const showFixedHeader = useCallback(() => setFixedHeaderVisible(true), [])

  const hideFooter = useCallback(() => setFooterVisible(false), [])
  const showFooter = useCallback(() => setFooterVisible(true), [])

  return (
    <Fragment>
      <FixedHeader article={article} visible={fixedHeaderVisible} footerVisible={footerVisible} />
      <Wrapper>
        <Header article={article} />
        <Title>
          <Balancer>
            <TitleText>{article.title}</TitleText>
          </Balancer>
          <SubTitle>{article.innerId}</SubTitle>
        </Title>
        <ArticleInfo article={article} />
        <ViewportTracker onEnter={hideFixedHeader} onLeave={showFixedHeader} />
        {loading && <ArticleContentLoading num={1} top={15} bottom={30} left={-25} />}
        {!loading && (
          <BodyWrapper>
            <ArticeBody document={article.document} />
          </BodyWrapper>
        )}

        {broadcastConfig.broadcastArticleEnable && (
          <ArticleBroadcast
            top={20}
            bottom={30}
            color={broadcastConfig.broadcastArticleBg}
            simple={broadcastConfig.broadcastArticleLayout === BROADCAST_ARTICLE_LAYOUT.SIMPLE}
          />
        )}
        <ArticleFooter />
        <ViewportTracker onEnter={showFooter} onLeave={hideFooter} />
        <GoTopWrapper $show={fixedHeaderVisible}>
          <GotoTop type="drawer" />
        </GoTopWrapper>
      </Wrapper>
    </Fragment>
  )
}

export default PostViewer
