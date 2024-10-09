import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'

import Button from '~/widgets/Buttons/Button'

import FeatItem from '../FeatItem'

import { FeatList } from '../../styles/articles_intro_tabs/intro_items'

const Contents = () => {
  const color = COLOR_NAME.PURPLE

  return (
    <>
      <FeatItem text="投票，发帖，评论" color={color} />
      <FeatItem text="标签，状态分类" color={color} />
      <FeatItem text="富文本内容" color={color} />
      <FeatItem text="强大的后台管理" color={color} />
      <FeatItem text="内置搜索，SEO 优化" color={color} />
      <FeatItem text="高度自定义" color={color} />
    </>
  )
}

const IntroItems: FC = () => {
  return (
    <>
      <FeatList>
        <Contents />
      </FeatList>

      <div className="grow" />
      <div className="w-32 mt-14 row gap-x-2">
        <Button>体验 Demo</Button>
        <Button ghost>了解更多</Button>
      </div>
    </>
  )
}

export default IntroItems
