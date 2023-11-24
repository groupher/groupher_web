/*
 *
 * ClassicSidebar
 * common sidebar include community badge, publisher, tagsbar ads .. etc,
 * used for classic layout
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import useViewingCommunity from '@/hooks/useViewingCommunity'
import { Space } from '@/widgets/Common'

import { buildLog } from '@/logger'
import {
  Wrapper,
  Brief,
  InfoBar,
  Logo,
  Title,
  Label,
  Count,
} from '../styles/thread_sidebar/community_brief'
import { assetSrc } from '@/utils/helper'

/* eslint-disable-next-line */
const log = buildLog('w:ClassicSidebar')

type TProps = {
  show: boolean
}

const CommunityBrief: FC<TProps> = ({ show }) => {
  const { logo, title, meta, subscribersCount } = useViewingCommunity()

  return (
    <Wrapper $show={show}>
      <Logo src={assetSrc(logo)} noLazy />
      <Brief>
        <Title>{title}</Title>
        <InfoBar>
          <Label>关注</Label>
          <Count>{subscribersCount}</Count>

          <Space right={15} />
          <Label>帖子</Label>
          <Count>{meta.postsCount}</Count>
        </InfoBar>
      </Brief>
    </Wrapper>
  )
}

export default observer(CommunityBrief)
