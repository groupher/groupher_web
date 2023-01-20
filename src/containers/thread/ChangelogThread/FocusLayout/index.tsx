/* *
 * ChangelogThread
 *
 */

import { FC, useState } from 'react'

import type { TGlobalLayout } from '@/spec'
import ChangelogItem from '@/widgets/ChangelogItem'
import Tabs from '@/widgets/Switcher/Tabs'

import { TABS_MODE_OPTIONS } from '../constant'
import FilterBar from './FilterBar'

import { Wrapper, Banner, TabsWrapper, Title, Desc, MainWrapper } from '../styles/focus_layout'

// const log = buildLog('C:ChangelogThread')

type TProps = {
  globalLayout: TGlobalLayout
}

const FocusLayout: FC<TProps> = ({ globalLayout }) => {
  // globalLayout.changelog === CHANGELOG_LAYOUT.OUTLINE
  const [filterExpand, setFilterExpand] = useState(false)
  const [tab, setTab] = useState(TABS_MODE_OPTIONS[0].raw)

  return (
    <Wrapper>
      <Banner>
        <Title>更新日志</Title>
        <Desc>Groupher 的功能更新，界面调整，性能与 Bug 修复等</Desc>
        <TabsWrapper>
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
      {filterExpand && <FilterBar tab={tab} />}
      <MainWrapper>
        <ChangelogItem layout={globalLayout.changelog} showFullArticle />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
        <ChangelogItem layout={globalLayout.changelog} />
      </MainWrapper>
    </Wrapper>
  )
}

export default FocusLayout
