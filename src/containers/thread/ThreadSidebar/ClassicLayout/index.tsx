/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { FC, Fragment, memo, useEffect, useState } from 'react'

import type { TThread, TCommunity, TAvatarLayout } from '@/spec'

import EVENT from '@/constant/event'
import { ARTICLE_CAT } from '@/constant/gtd'

import { buildLog } from '@/utils/logger'
import { send } from '@/utils/signal'
import { mockUsers } from '@/utils/mock'

import ImgFallback from '@/widgets/ImgFallback'
import Sticky from '@/widgets/Sticky'
import { SpaceGrow, Br } from '@/widgets/Common'

import PublishButton from '@/widgets/Buttons/PublishButton'
import TagsBar from '@/containers/unit/TagsBar'

import { CommunityJoinBadge } from './dynamic'

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
} from '../styles/classic_layout'
import { onPublish } from '../logic'

/* eslint-disable-next-line */
const log = buildLog('w:ClassicSidebar')

export type TProps = {
  showCommunityBadge: boolean
  thread: TThread
  community: TCommunity
  avatarLayout: TAvatarLayout
}

const ClassicLayout: FC<TProps> = ({ showCommunityBadge, thread, community, avatarLayout }) => {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
  }, [])

  return (
    <Wrapper testid="thread-sidebar">
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
              <DividerTitle>团队</DividerTitle>
              <Br top={14} />
            </Fragment>
          )}

          <CommunityJoinersWrapper show={showCommunityBadge}>
            {mockUsers(5).map((user) => (
              <JoinerAvatar
                key={user.id}
                src={user.avatar}
                avatarLayout={avatarLayout}
                fallback={<ImgFallback size={24} user={user} avatarLayout={avatarLayout} />}
              />
            ))}
            <MoreNum>+2</MoreNum>
          </CommunityJoinersWrapper>
        </Fragment>

        <StickyWrapper>
          <PublishWrapper show={showCommunityBadge}>
            <PublishButton
              thread={thread}
              community={community.slug}
              text="参与讨论"
              onClick={() => onPublish(ARTICLE_CAT.FEATURE)}
              onMenuSelect={onPublish}
            />
          </PublishWrapper>

          {load && !showCommunityBadge && <CommunityJoinBadge />}
          <TagsBarWrapper>
            <TagsBar onSelect={() => send(EVENT.REFRESH_ARTICLES)} />
          </TagsBarWrapper>

          <SpaceGrow />
        </StickyWrapper>
      </Sticky>
    </Wrapper>
  )
}

export default memo(ClassicLayout)
