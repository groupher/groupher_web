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
import ImgFallback from '@/widgets/ImgFallback'

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

const _log = buildLog('w:ClassicSidebar')

type TProps = {
  show: boolean
}

const CommunityBrief: FC<TProps> = ({ show }) => {
  const { logo, title, meta, subscribersCount } = useViewingCommunity()

  return (
    <Wrapper $show={show}>
      <Logo
        src={assetSrc(logo)}
        fallback={<ImgFallback size={32} top={-6} title={title} />}
        noLazy
      />

      <Brief>
        <Title>{title}</Title>
        <InfoBar>
          <Label>关注</Label>
          <Count>{subscribersCount}</Count>

          <Space right={15} />
          <Label>帖子</Label>
          <Count>{meta?.postsCount}</Count>
        </InfoBar>
      </Brief>
    </Wrapper>
  )
}

export default observer(CommunityBrief)
