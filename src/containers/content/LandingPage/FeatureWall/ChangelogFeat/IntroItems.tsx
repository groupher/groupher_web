import { FC } from 'react'

import { SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { FeatList, MobileIntroLists } from '../../styles/feature_wall/intro_items'

const featType = FEAT_TYPE.CHANGELOG

const Contents = () => {
  return (
    <>
      <FeatItem text="封面图片编辑" featType={featType} />
      <FeatItem text="强大的富文本内容" featType={featType} />
      <FeatItem text="标签，版本，时间归档" featType={featType} />
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
