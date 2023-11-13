/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import type { TArticleCat } from '@/spec'
import { PUBLISH_MODE } from '@/constant/publish'

import { ARTICLE_CAT, ARTICLE_STATE_MODE } from '@/constant/gtd'
import TYPE from '@/constant/type'
import { BANNER_LAYOUT } from '@/constant/layout'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'
import PublishButton from '@/widgets/Buttons/PublishButton'
import CatSelector from '@/widgets/CatSelector'
import StateSelector from '@/widgets/StateSelector'
import SearchBox from '@/widgets/SearchBox'

import SortFilter from './SortFilter'
// import SelectedFilters from './SelectedFilters'
// import FilterResult from './FilterResult'

import type { TProps } from '.'
import { Wrapper } from './styles'

export const LavaLampLoading = dynamic(() => import('@/widgets/Loading/LavaLampLoading'), {
  ssr: false,
})

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({
  activeFilter = {},
  onSelect = log,
  resState = TYPE.RES_STATE.DONE,
  mode = 'default',
}) => {
  const bannerLayout = useBannerLayout()
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)

  console.log('## activeCat: ', activeCat)
  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <CatSelector
            activeCat={activeCat}
            onSelect={setActiveCat}
            selected={activeCat !== ARTICLE_CAT.ALL}
          />
          <StateSelector mode={ARTICLE_STATE_MODE.FILTER} />
          <Space right={10} />
          <SpaceGrow />
          <DesktopOnly>
            {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading right={28} left={10} />}
          </DesktopOnly>
        </Fragment>
      )}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SearchBox right={8} />}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && (
        <PublishButton
          text="参与讨论"
          mode={PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER}
          onClick={() => console.log('## publish')}
          onMenuSelect={() => console.log('## on publish')}
          offset={[5, 5]}
          placement="bottom"
          top={-1}
        />
      )}

      {bannerLayout === BANNER_LAYOUT.HEADER && <SearchBox right={-15} />}
    </Wrapper>
  )
}

export default observer(ArticlesFilter)
