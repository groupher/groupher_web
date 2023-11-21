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
import EVENT from '@/constant/event'
import { ARTICLE_CAT } from '@/constant/gtd'

import { buildLog } from '@/logger'
import { send, callGEditor, callSyncSelector } from '@/signal'
import { mockUsers } from '@/mock'

import ImgFallback from '@/widgets/ImgFallback'
import Sticky from '@/widgets/Sticky'
import { SpaceGrow, Br } from '@/widgets/Common'

import PublishButton from '@/widgets/Buttons/PublishButton'
import TagsBar from '@/containers/unit/TagsBar'

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
} from './styles/thread_sidebar'

/* eslint-disable-next-line */
const log = buildLog('w:ClassicSidebar')

const ThreadSidebar: FC = () => {
  const { inView: showCommunityBadge } = useCommunityDigestViewport()
  const avatarLayout = useAvatarLayout()

  return (
    <Wrapper $testid="thread-sidebar">
      <Sticky offsetTop={50}>
        <Fragment>
          {showCommunityBadge && (
            <Fragment>
              <DividerTitle>简介</DividerTitle>
              <Br top={10} />
              <CommunityNoteWrapper>
                让你的产品聆听用户的声音。互动讨论，GTD
                看板，更新日志，帮助文档多合一，收集整理用户用户反馈，助你打造更好的产品
              </CommunityNoteWrapper>
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
            <MoreNum>+2</MoreNum>
          </CommunityJoinersWrapper>
        </Fragment>

        <StickyWrapper>
          <PublishWrapper $show={showCommunityBadge}>
            <PublishButton
              text="参与讨论"
              onClick={() => {
                // callGEditor()
                // setTimeout(() => callSyncSelector({ cat, tag: store.activeTag }), 500)
                // onPublish(ARTICLE_CAT.FEATURE)
              }}
              onMenuSelect={() => {
                console.log('## TODO')
              }}
              left={-2}
              offset={[0, 5]}
            />
          </PublishWrapper>

          <TagsBarWrapper>
            <TagsBar onSelect={() => send(EVENT.REFRESH_ARTICLES)} />
          </TagsBarWrapper>

          <SpaceGrow />
        </StickyWrapper>
      </Sticky>
    </Wrapper>
  )
}

export default observer(ThreadSidebar)
