import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'

import Button from '~/widgets/Buttons/Button'
import FeatItem from '../FeatItem'

import { FeatList } from '../../styles/articles_intro_tabs/intro_items'

const Contents = () => {
  const color = COLOR_NAME.RED

  return (
    <>
      <FeatItem text="封面图片编辑" color={color} />
      <FeatItem text="强大的富文本内容" color={color} />
      <FeatItem text="标签，版本，时间归档" color={color} />
      <FeatItem text="评论，表情反馈" color={color} />
      <FeatItem text="一键多渠道分享" color={color} />
      <FeatItem text="自定义模板" color={color} />
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
