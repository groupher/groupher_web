/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { Fragment, lazy, Suspense } from 'react'

import useTrans from '@/hooks/useTrans'
import useLayout from '@/hooks/useLayout'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useActiveTag from '@/hooks/useActiveTag'

import { Link, SpaceGrow, Br, SexyDivider } from '@/widgets/Common'
import { refreshArticles, callGEditor, callSyncSelector, listUsers } from '@/signal'
import { toJS } from '@/mobx'
import { mockUsers } from '@/mock'
import { BANNER_LAYOUT } from '@/const/layout'

import ImgFallback from '@/widgets/ImgFallback'
import Sticky from '@/widgets/Sticky'
import GetMe from '@/widgets/GetMe'

import PublishButton from '@/widgets/Buttons/PublishButton'
import TagsBar from '@/containers/unit/TagsBar'

import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  TagsBarWrapper,
  StickyWrapper,
  DividerTitle,
  CommunityJoinersWrapper,
  ShowBox,
  JoinerAvatar,
  MoreNum,
  CommunityNoteWrapper,
  HomeLinkWrapper,
  LinkIcon,
  PublishWrapper,
} from '../styles/thread_sidebar'

const UniBar = lazy(() => import('@/widgets/UniBar'))

export default () => {
  const { t } = useTrans()
  const curCommunity = useViewingCommunity()

  const { inView: showCommunityBadge } = useCommunityDigestViewport()
  const { avatarLayout, bannerLayout } = useLayout()
  const activeTag = useActiveTag()

  return (
    <Wrapper $testid="thread-sidebar">
      <Sticky offsetTop={0}>
        <Fragment>
          {showCommunityBadge && bannerLayout !== BANNER_LAYOUT.TABBER && (
            <Fragment>
              <DividerTitle>{t('intro', 'titleCase')}</DividerTitle>
              <Br top={10} />
              <CommunityNoteWrapper>{curCommunity.desc}</CommunityNoteWrapper>
              <HomeLinkWrapper>
                <LinkIcon />
                <Link href="https://groupher.com" maxLength="150px">
                  {curCommunity.homepage}
                </Link>
                <SpaceGrow />

                <GetMe />
              </HomeLinkWrapper>
            </Fragment>
          )}

          <ShowBox $show={showCommunityBadge}>
            {showCommunityBadge && (
              <Fragment>
                <DividerTitle>{t('team.member', 'titleCase')}</DividerTitle>
                <Br top={14} />
              </Fragment>
            )}

            <CommunityJoinersWrapper $show>
              {mockUsers(5).map((user) => (
                <JoinerAvatar
                  key={user.login}
                  src={user.avatar}
                  $avatarLayout={avatarLayout}
                  fallback={<ImgFallback size={24} right={8} user={user} />}
                />
              ))}
              <MoreNum onClick={() => listUsers('drawer')}>+2</MoreNum>
            </CommunityJoinersWrapper>
          </ShowBox>
        </Fragment>

        <StickyWrapper $extend={!showCommunityBadge}>
          <PublishWrapper $show={showCommunityBadge}>
            <PublishButton
              text="参与讨论"
              onMenuSelect={(cat) => {
                callGEditor()
                setTimeout(() => callSyncSelector({ cat, tag: toJS(activeTag) }), 500)
              }}
              left={-2}
              offset={[0, 5]}
            />
          </PublishWrapper>

          <CommunityBrief show={!showCommunityBadge} />
          {!showCommunityBadge && <SexyDivider bottom={5} />}

          <TagsBarWrapper>
            <TagsBar onSelect={() => refreshArticles()} />
          </TagsBarWrapper>

          <SpaceGrow />
          <Suspense fallback={null}>
            <UniBar />
          </Suspense>
        </StickyWrapper>
      </Sticky>
    </Wrapper>
  )
}
