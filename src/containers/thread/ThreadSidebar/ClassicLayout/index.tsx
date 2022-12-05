/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { FC, Fragment, memo, useEffect, useState } from 'react'

import type { TThread, TCommunity } from '@/spec'
import { buildLog } from '@/utils/logger'
import { send } from '@/utils/signal'
import { mockUsers } from '@/utils/mock'
import { ARTICLE_CAT, EVENT } from '@/constant'

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
  CommunityJoinersNum,
  CommunityJoinersWrapper,
  JoinerAvatar,
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
}

const ClassicLayout: FC<TProps> = ({
  showCommunityBadge,
  thread,
  community,
}) => {
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
                关于 Groupher 的各种建议，吐槽等请发布到这里 关于 Groupher
                的各种建议，吐槽等请发布到这里
              </CommunityNoteWrapper>
            </Fragment>
          )}

          {showCommunityBadge && (
            <Fragment>
              <DividerTitle>
                参与者
                <CommunityJoinersNum>329</CommunityJoinersNum>
              </DividerTitle>
              <Br top={14} />
            </Fragment>
          )}

          <CommunityJoinersWrapper show={showCommunityBadge}>
            {mockUsers(5).map((user) => (
              <JoinerAvatar key={user.id} src={user.avatar} noLazy />
            ))}
          </CommunityJoinersWrapper>
        </Fragment>

        <StickyWrapper>
          <PublishWrapper show={showCommunityBadge}>
            <PublishButton
              thread={thread}
              community={community.raw}
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
