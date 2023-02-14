import { FC } from 'react'

import { SpaceGrow } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import {
  FeatList,
  MobileWrapper,
  DesktopOnly,
  MobileOnly,
} from '../../styles/feature_wall/discuss_feat/intro_items'

const Contents = () => {
  return (
    <>
      <FeatItem text="投票，发帖，评论" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="标签，状态分类" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="富文本内容" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="移动端友好" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="强大的后台管理" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="内置搜索，SEO 优化" featType={FEAT_TYPE.DISCUSS} />
      <FeatItem text="高度自定义" featType={FEAT_TYPE.DISCUSS} />
    </>
  )
}

const IntroItems: FC = () => {
  return (
    <>
      <MobileOnly>
        <MobileWrapper>
          <Contents />
          <MoreLink href="/" featType={FEAT_TYPE.DISCUSS} />
        </MobileWrapper>
      </MobileOnly>

      <DesktopOnly>
        <FeatList>
          <Contents />
        </FeatList>

        <SpaceGrow />
        <MoreLink href="/" featType={FEAT_TYPE.DISCUSS} />
      </DesktopOnly>
    </>
  )
}

export default IntroItems
