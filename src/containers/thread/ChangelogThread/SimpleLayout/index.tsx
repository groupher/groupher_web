/* *
 * ChangelogThread
 *
 */

import { useState } from 'react'

import useLayout from '~/hooks/useLayout'
import usePagedChangelogs from '~/hooks/usePagedChangelogs'
import { BANNER_LAYOUT, CHANGELOG_LAYOUT } from '~/const/layout'

import ChangelogItem from '~/widgets/ChangelogItem'
import Tabs from '~/widgets/Switcher/Tabs'

import { TABS_MODE_OPTIONS } from '../constant'
import FilterBar from './FilterBar'

import { Wrapper, Banner, TabsWrapper, Title, Desc, MainWrapper } from '../styles/simple_layout'

export default () => {
  const { pagedChangelogs } = usePagedChangelogs()
  const { bannerLayout, changelogLayout } = useLayout()

  const [filterExpand, setFilterExpand] = useState(false)
  const [tab, setTab] = useState(TABS_MODE_OPTIONS[0].slug)

  const alignLeft = changelogLayout === CHANGELOG_LAYOUT.SIMPLE

  return (
    <Wrapper isSidebarLayout={bannerLayout === BANNER_LAYOUT.SIDEBAR}>
      <Banner alignLeft={alignLeft}>
        <Title>更新日志</Title>
        <Desc>Groupher 的功能更新，界面调整，性能与 Bug 修复等</Desc>
        <TabsWrapper alignLeft={alignLeft}>
          <Tabs
            items={TABS_MODE_OPTIONS}
            size="small"
            activeKey={tab}
            bottomSpace={4}
            onChange={(slug) => {
              setTab(slug)

              if (slug === TABS_MODE_OPTIONS[0].slug) {
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
          <ChangelogItem key={item.innerId} article={item} />
        ))}
      </MainWrapper>
    </Wrapper>
  )
}
