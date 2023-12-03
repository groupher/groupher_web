import { FC } from 'react'

import { SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { FeatList, MobileIntroLists } from '../../styles/articles_intro_tabs/intro_items'

const featType = FEAT_TYPE.DISCUSS

const Contents = () => {
  return (
    <>
      <FeatItem text="投票，发帖，评论" featType={featType} />
      <FeatItem text="标签，状态分类" featType={featType} />
      <FeatItem text="富文本内容" featType={featType} />
      <FeatItem text="移动端友好" featType={featType} />
      <FeatItem text="强大的后台管理" featType={featType} />
      <FeatItem text="内置搜索，SEO 优化" featType={featType} />
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
