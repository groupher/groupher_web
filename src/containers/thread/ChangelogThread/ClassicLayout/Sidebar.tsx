import { FC, memo, useEffect } from 'react'

import TAG_MODE from '@/constant/tag'
import VIEW from '@/constant/view'

import TagsBar from '@/containers/unit/TagsBar'
import Tabs from '@/widgets/Switcher/Tabs'

import type { TTagsMode } from '../spec'
import { TABS_MODE_OPTIONS } from '../constant'
import { tagsModeChange } from '../logic'
import { Wrapper, Title, Desc, TabWrapper } from '../styles/classic_layout/sidebar'

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
      <Title>更新日志</Title>
      <Desc>Groupher 的功能更新，界面调整，性能与 Bug 修复等</Desc>
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
      <TagsBar onSelect={() => console.log} mode={TAG_MODE.LABEL} />
    </Wrapper>
  )
}

export default memo(Sidebar)
