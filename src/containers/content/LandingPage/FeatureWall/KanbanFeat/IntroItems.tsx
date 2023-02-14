import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import {
  FeatList,
  DesktopOnly,
  MobileOnly,
  MobileIntroLists,
} from '../../styles/feature_wall/intro_items'

const featType = FEAT_TYPE.KANBAN

const Contents = () => {
  return (
    <>
      <FeatItem text="经典简洁的 UI" featType={featType} />
      <FeatItem text="富文本内容" featType={featType} />
      <FeatItem text="状态自然同步" featType={featType} />
      <FeatItem text="评论，表情反馈" featType={featType} />
      <FeatItem text="一键多渠道分享" featType={featType} />
      <FeatItem text="高度自定义" featType={featType} />
    </>
  )
}

const IntroItems: FC = () => {
  return (
    <>
      <MobileOnly>
        <MobileIntroLists>
          <Contents />
          <MoreLink href="/" featType={featType} />
        </MobileIntroLists>
      </MobileOnly>

      <DesktopOnly>
        <FeatList>
          <Contents />
        </FeatList>

        <SpaceGrow />
        <MoreLink href="/" featType={featType} />
      </DesktopOnly>
    </>
  )
}

export default IntroItems
