/*
 *
 * DashboardDesc
 *
 */

import { FC, memo, useState } from 'react'

import type { TPostLayout } from '@/spec'

import { POST_LAYOUT } from '@/constant/layout'
import SVG from '@/constant/svg'
import VIEW from '@/constant/view'

import { buildLog } from '@/logger'

import Tabs from '@/widgets/Switcher/Tabs'
import IconSwitcher from '@/widgets/Switcher/IconSwitcher'
import NoticeBar from '@/widgets/NoticeBar'

import type { TPreviewDevice } from '../spec'
import { DEMO_POSTS, PREVIEW_MODE } from '../constant'
import Mobile from './Mobile'
import Desktop from './Desktop'

import { Wrapper, TabsWrapper, MediaWrapper } from '../styles/post_layout_example'

const _log = buildLog('w:DashboardDesc:index')

const switchItems = [
  {
    key: PREVIEW_MODE.DESKTOP,
    icon: SVG.DESKTOP,
    desc: '桌面端',
  },
  {
    key: PREVIEW_MODE.MOBILE,
    icon: SVG.MOBILE,
    desc: '手机端',
  },
]

export const TABS_MODE_OPTIONS = [
  {
    title: '经典（默认）',
    slug: POST_LAYOUT.QUORA,
  },
  {
    title: '三段式',
    slug: POST_LAYOUT.PH,
  },
  {
    title: '瀑布流卡片',
    slug: POST_LAYOUT.MASONRY,
  },
  {
    title: '极简',
    slug: POST_LAYOUT.MINIMAL,
  },
  {
    title: '封面图',
    slug: POST_LAYOUT.COVER,
  },
]

type TProps = {
  activePostLayout: TPostLayout
}

const PostLayoutExample: FC<TProps> = ({ activePostLayout }) => {
  const [mode, setMode] = useState<TPreviewDevice>(PREVIEW_MODE.DESKTOP)
  const [postLayout, setPostLayout] = useState<TPostLayout>(activePostLayout)

  return (
    <Wrapper>
      <NoticeBar type="info" content="列表中的帖子仅为展示布局参考，非真实存在。" bottom={30} />

      <MediaWrapper>
        <IconSwitcher
          items={switchItems}
          activeKey={mode}
          onChange={(item) => setMode(item.key as TPreviewDevice)}
        />
      </MediaWrapper>

      <TabsWrapper>
        <Tabs
          items={TABS_MODE_OPTIONS}
          size="small"
          activeKey={postLayout}
          onChange={setPostLayout}
          view={VIEW.DESKTOP}
        />
      </TabsWrapper>

      <br />

      {mode === PREVIEW_MODE.DESKTOP && <Desktop articles={DEMO_POSTS} layout={postLayout} />}
      {mode === PREVIEW_MODE.MOBILE && <Mobile articles={DEMO_POSTS} />}
    </Wrapper>
  )
}

export default memo(PostLayoutExample)
