import type { FC } from 'react'

import { COLOR_NAME } from '~/const/colors'

import Button from '~/widgets/Buttons/Button'

import FeatItem from '../FeatItem'

import { FeatList } from '../../styles/articles_intro_tabs/intro_items'

const Contents = () => {
  const color = COLOR_NAME.CYAN

  return (
    <>
      <FeatItem text="保存即发布，No bullshit" color={color} />
      <FeatItem text="自定义 FAQ" color={color} />
      <FeatItem text="支持 MD 格式导入" color={color} />
      <FeatItem text="富文本内容" color={color} />
      <FeatItem text="自定义目录封面" color={color} />
      <FeatItem text="表情反馈" color={color} />
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
