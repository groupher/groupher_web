import type { FC } from 'react'

import { COLOR_NAME } from '@/const/colors'
import { SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { FeatList, MobileIntroLists } from '../../styles/articles_intro_tabs/intro_items'

const Contents = () => {
  const color = COLOR_NAME.PURPLE

  return (
    <>
      <FeatItem text="投票，发帖，评论" color={color} />
      <FeatItem text="标签，状态分类" color={color} />
      <FeatItem text="富文本内容" color={color} />
      <FeatItem text="移动端友好" color={color} />
      <FeatItem text="强大的后台管理" color={color} />
      <FeatItem text="内置搜索，SEO 优化" color={color} />
      <FeatItem text="高度自定义" color={color} />
    </>
  )
}

const IntroItems: FC = () => {
  return (
    <>
      <MobileOnly>
        <MobileIntroLists>
          <Contents />
          <MoreLink href="/" color={COLOR_NAME.PURPLE} />
        </MobileIntroLists>
      </MobileOnly>

      <DesktopOnly>
        <FeatList>
          <Contents />
        </FeatList>

        <SpaceGrow />
        <MoreLink href="/" color={COLOR_NAME.PURPLE} />
      </DesktopOnly>
    </>
  )
}

export default IntroItems
