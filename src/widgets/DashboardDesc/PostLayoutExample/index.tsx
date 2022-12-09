/*
 *
 * DashboardDesc
 *
 */

import { FC, memo, useState } from 'react'

import type { TPostLayout } from '@/spec'
import { POST_LAYOUT, SVG, VIEW } from '@/constant'
import { buildLog } from '@/utils/logger'

import Tabs from '@/widgets/Switcher/Tabs'
import IconSwitcher from '@/widgets/Switcher/IconSwitcher'
import NoticeBar from '@/widgets/NoticeBar'

import type { TPreviewDevice } from '../spec'
import { DEMO_POSTS, PREVIEW_MODE } from '../constant'
import Mobile from './Mobile'
import Desktop from './Desktop'

import { Wrapper, TabsWrapper, MediaWrapper } from '../styles/post_layout_example'

/* eslint-disable-next-line */
const log = buildLog('w:DashboardDesc:index')

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
    title: '投票列表',
    raw: POST_LAYOUT.UPVOTE_FIRST,
  },
  {
    title: '评论列表',
    raw: POST_LAYOUT.COMMENT_FIRST,
  },
  {
    title: '卡片列表',
    raw: POST_LAYOUT.CARD,
  },
  {
    title: '极简列表',
    raw: POST_LAYOUT.MINIMAL,
  },
  {
    title: '封面图列表',
    raw: POST_LAYOUT.COVER,
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
          bottomSpace={4}
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
