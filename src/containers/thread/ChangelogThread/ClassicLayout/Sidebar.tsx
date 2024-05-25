import { FC, memo, useEffect } from 'react'

import VIEW from '@/const/view'

import TagsBar from '@/containers/unit/TagsBar'
import Tabs from '@/widgets/Switcher/Tabs'
import Sticky from '@/widgets/Sticky'

import type { TTagsMode } from '../spec'
import { TABS_MODE_OPTIONS } from '../constant'
import { tagsModeChange } from '../logic'
import { Wrapper, Desc, TabWrapper } from '../styles/classic_layout/sidebar'

type TProps = {
  tagsMode: TTagsMode
}

const Sidebar: FC<TProps> = ({ tagsMode }) => {
  useEffect(() => {
    setTimeout(() => {
      tagsModeChange(TABS_MODE_OPTIONS[1].slug)
    }, 100)
  }, [])

  return (
    <Wrapper>
      <Desc>Groupher 的功能更新，界面调整，性能与 Bug 修复等</Desc>
      <Sticky offsetTop={30}>
        <TabWrapper>
          <Tabs
            items={TABS_MODE_OPTIONS.slice(1)}
            size="small"
            activeKey={tagsMode}
            bottomSpace={4}
            onChange={tagsModeChange}
            view={VIEW.DESKTOP}
          />
        </TabWrapper>
        <TagsBar onSelect={() => console.log} />
      </Sticky>
    </Wrapper>
  )
}

export default memo(Sidebar)
