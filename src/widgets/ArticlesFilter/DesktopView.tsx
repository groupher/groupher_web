/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, useState } from 'react'
import { observer } from 'mobx-react'

import type { TArticleCat } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE_MODE } from '@/constant/gtd'
import TYPE from '@/constant/type'
import { BANNER_LAYOUT } from '@/constant/layout'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'
import PublishButton from '@/widgets/Buttons/PublishButton'
import LavaLampLoading from '@/widgets/Loading/LavaLampLoading'
import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'

import SearchBox from './SearchBox'
import SortFilter from './SortFilter'
// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import type { TProps } from '.'
import { Wrapper, PublishWrapper } from './styles'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({
  activeFilter = {},
  onSelect = log,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
  onSearch = log,
  closeSearch = log,
}) => {
  const bannerLayout = useBannerLayout()
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  // const { activeThread } = useViewing()
  const searchMode = mode === 'search'

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <Space right={2} />
          <CatSelector activeCat={activeCat} onSelect={setActiveCat} />
          <Space right={2} />
          <StateSelector mode={ARTICLE_STATE_MODE.FILTER} />
          <SpaceGrow />
          <DesktopOnly>
            {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading right={28} left={10} />}
          </DesktopOnly>
        </Fragment>
      )}

      {bannerLayout === BANNER_LAYOUT.SIDEBAR ? (
        <PublishWrapper>
          <PublishButton
            thread="post"
            community="home"
            mode="sidebar_layout_header"
            text="参与讨论"
            onClick={() => console.log('## publish')}
            onMenuSelect={() => console.log('## on publish')}
          />
        </PublishWrapper>
      ) : (
        <SearchBox searchMode={searchMode} onSearch={onSearch} closeSearch={closeSearch} />
      )}
    </Wrapper>
  )
}

export default observer(ArticlesFilter)
