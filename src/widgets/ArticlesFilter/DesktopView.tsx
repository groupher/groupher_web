/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import type { TArticleCat, TArticleState } from '@/spec'
import { PUBLISH_MODE } from '@/constant/publish'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import TYPE from '@/constant/type'
import { BANNER_LAYOUT } from '@/constant/layout'
import { POST_STATE_MENU_ITEMS, POST_CAT_MENU_ITEMS } from '@/constant/menu'
import useBannerLayout from '@/hooks/useBannerLayout'

import { buildLog } from '@/logger'

import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'
import PublishButton from '@/widgets/Buttons/PublishButton'
import ConditionSelector from '@/widgets/ConditionSelector'
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
  const [activeState, setActiveState] = useState<TArticleState>(ARTICLE_STATE.ALL)

  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <SortFilter onSelect={onSelect} activeFilter={activeFilter} />
          <ConditionSelector
            mode="category"
            title="分类"
            active={activeCat}
            onSelect={(cat: TArticleCat) => setActiveCat(cat)}
            selected={activeCat !== ARTICLE_CAT.ALL}
            menuItems={POST_CAT_MENU_ITEMS}
          />
          <ConditionSelector
            mode="state"
            title="状态"
            active={activeState}
            onSelect={(state: TArticleState) => setActiveState(state)}
            selected={activeState !== ARTICLE_STATE.ALL}
            menuItems={POST_STATE_MENU_ITEMS}
          />
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
