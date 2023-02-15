import { FC } from 'react'

import { SpaceGrow, DesktopOnly, MobileOnly } from '@/widgets/Common'

import { FEAT_TYPE } from '../../constant'

import FeatItem from '../FeatItem'
import MoreLink from '../MoreLink'

import { FeatList, MobileIntroLists } from '../../styles/feature_wall/intro_items'

const featType = FEAT_TYPE.HELP

const Contents = () => {
  return (
    <>
      <FeatItem text="保存即发布，No bullshit" featType={featType} />
      <FeatItem text="支持 MD 格式导入" featType={featType} />
      <FeatItem text="富文本内容" featType={featType} />
      <FeatItem text="多种目录封面" featType={featType} />
      <FeatItem text="表情反馈" featType={featType} />
      <FeatItem text="默认好看" featType={featType} />
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
