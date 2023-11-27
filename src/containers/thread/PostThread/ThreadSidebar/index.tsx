/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { FC, Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import useAvatarLayout from '@/hooks/useAvatarLayout'
import useCommunityDigestViewport from '@/hooks/useCommunityDigestViewport'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import useActiveTag from '@/hooks/useActiveTag'

import { buildLog } from '@/logger'
import { refreshArticles, callGEditor, callSyncSelector, listUsers } from '@/signal'
import { toJS } from '@/mobx'
import { mockUsers } from '@/mock'

import ImgFallback from '@/widgets/ImgFallback'
import Sticky from '@/widgets/Sticky'
import { SpaceGrow, Br, SexyDivider } from '@/widgets/Common'

import PublishButton from '@/widgets/Buttons/PublishButton'
import TagsBar from '@/containers/unit/TagsBar'

import CommunityBrief from './CommunityBrief'

import {
  Wrapper,
  TagsBarWrapper,
  StickyWrapper,
  DividerTitle,
  CommunityJoinersWrapper,
  JoinerAvatar,
  MoreNum,
  CommunityNoteWrapper,
  PublishWrapper,
} from '../styles/thread_sidebar'

/* eslint-disable-next-line */
const log = buildLog('w:ClassicSidebar')

const ThreadSidebar: FC = () => {
  const curCommunity = useViewingCommunity()
  const { inView: showCommunityBadge } = useCommunityDigestViewport()
  const avatarLayout = useAvatarLayout()
  const activeTag = useActiveTag()

  return (
    <Wrapper $testid="thread-sidebar">
      <Sticky offsetTop={50}>
        <Fragment>
          {showCommunityBadge && (
            <Fragment>
              <DividerTitle>简介</DividerTitle>
              <Br top={10} />
              <CommunityNoteWrapper>{curCommunity.desc}</CommunityNoteWrapper>
            </Fragment>
          )}

          {showCommunityBadge && (
            <Fragment>
              <DividerTitle>团队成员</DividerTitle>
              <Br top={14} />
            </Fragment>
          )}

          <CommunityJoinersWrapper $show={showCommunityBadge}>
            {mockUsers(5).map((user) => (
              <JoinerAvatar
                key={user.id}
                src={user.avatar}
                $avatarLayout={avatarLayout}
                fallback={<ImgFallback size={24} user={user} />}
              />
            ))}
            <MoreNum onClick={() => listUsers('drawer')}>+2</MoreNum>
          </CommunityJoinersWrapper>
        </Fragment>

        <StickyWrapper>
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
        </StickyWrapper>
      </Sticky>
    </Wrapper>
  )
}

export default observer(ThreadSidebar)
