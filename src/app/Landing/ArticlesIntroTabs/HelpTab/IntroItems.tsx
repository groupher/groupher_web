import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'
import { SpaceGrow, DesktopOnly, MobileOnly } from '~/widgets/Common'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { FeatList, MobileIntroLists } from '../../styles/articles_intro_tabs/intro_items'

const Contents = () => {
  const color = COLOR_NAME.CYAN

  return (
    <>
      <FeatItem text="保存即发布，No bullshit" color={color} />
      <FeatItem text="自定义 FAQ" color={color} />
      <FeatItem text="支持 MD 格式导入" color={color} />
      <FeatItem text="富文本内容" color={color} />
      <FeatItem text="自定义目录封面" color={color} />
      <FeatItem text="文档行内评论" color={color} />
      <FeatItem text="表情反馈" color={color} />
      <FeatItem text="默认好看" color={color} />
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
          <MoreLink href="/" color={COLOR_NAME.CYAN} />
        </MobileIntroLists>
      </MobileOnly>

      <DesktopOnly>
        <FeatList>
          <Contents />
        </FeatList>

        <SpaceGrow />
        <MoreLink href="/" color={COLOR_NAME.CYAN} />
      </DesktopOnly>
    </>
  )
}

export default IntroItems
