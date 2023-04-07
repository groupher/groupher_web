/* *
 * ChangelogThread
 *
 */

import { FC, useState } from 'react'

import type { TAvatarLayout, TGlobalLayout, TPagedArticles } from '@/spec'
import { CHANGELOG_LAYOUT } from '@/constant/layout'

import ChangelogItem from '@/widgets/ChangelogItem'
import Tabs from '@/widgets/Switcher/Tabs'

import { TABS_MODE_OPTIONS } from '../constant'
import FilterBar from './FilterBar'

import { Wrapper, Banner, TabsWrapper, Title, Desc, MainWrapper } from '../styles/simple_layout'

// const log = buildLog('C:ChangelogThread')

type TProps = {
  globalLayout: TGlobalLayout
  isSidebarLayout: boolean
  avatarLayout: TAvatarLayout
  pagedChangelogs: TPagedArticles
}

const SimpleLayout: FC<TProps> = ({
  globalLayout,
  isSidebarLayout,
  avatarLayout,
  pagedChangelogs,
}) => {
  const [filterExpand, setFilterExpand] = useState(false)
  const [tab, setTab] = useState(TABS_MODE_OPTIONS[0].raw)

  const alignLeft = globalLayout.changelog === CHANGELOG_LAYOUT.SIMPLE

  return (
    <Wrapper isSidebarLayout={isSidebarLayout}>
      <Banner alignLeft={alignLeft}>
        <Title>更新日志</Title>
        <Desc>Groupher 的功能更新，界面调整，性能与 Bug 修复等</Desc>
        <TabsWrapper alignLeft={alignLeft}>
          <Tabs
            items={TABS_MODE_OPTIONS}
            size="small"
            activeKey={tab}
            bottomSpace={4}
            onChange={(raw) => {
              setTab(raw)

              if (raw === TABS_MODE_OPTIONS[0].raw) {
                return setFilterExpand(false)
              }
              setFilterExpand(true)
            }}
          />
        </TabsWrapper>
      </Banner>

      {filterExpand && <FilterBar tab={tab} alignLeft={alignLeft} />}
      <MainWrapper>
        {pagedChangelogs.entries.map((item) => (
          <ChangelogItem
            key={item.innerId}
            layout={globalLayout.changelog}
            avatarLayout={avatarLayout}
            article={item}
          />
        ))}
      </MainWrapper>
    </Wrapper>
  )
}

export default SimpleLayout
