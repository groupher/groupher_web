/*
 *
 * ArticlesFilter
 *
 */

import { FC, useState } from 'react'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

import type { TArticleCat, TArticleSort, TArticleState } from '@/spec'
import { refreshArticles, callGEditor, callSyncSelector } from '@/signal'
import { PUBLISH_MODE } from '@/constant/publish'
import { CONDITION_MODE } from '@/constant/mode'
import { ARTICLE_SORT } from '@/constant/sort'
import TYPE from '@/constant/type'
import { BANNER_LAYOUT } from '@/constant/layout'

import useBannerLayout from '@/hooks/useBannerLayout'
import useArticlesFilter from '@/hooks/useArticlesFilter'

import { buildLog } from '@/logger'

import { Space, SpaceGrow, DesktopOnly } from '@/widgets/Common'
import PublishButton from '@/widgets/Buttons/PublishButton'
import ConditionSelector from '@/widgets/ConditionSelector'
import SearchBox from '@/widgets/SearchBox'

import type { TProps } from '.'
import { Wrapper } from './styles'

export const LavaLampLoading = dynamic(() => import('@/widgets/Loading/LavaLampLoading'), {
  ssr: false,
})

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({ resState = TYPE.RES_STATE.DONE, mode = 'default' }) => {
  const bannerLayout = useBannerLayout()
  const { cat: activeCat, state: activeState, updateActiveFilter } = useArticlesFilter()
  const [activeSort, setActiveSort] = useState<TArticleSort>(ARTICLE_SORT.ALL)

  return (
    <Wrapper>
      <ConditionSelector
        mode={CONDITION_MODE.SORT}
        active={activeSort}
        onSelect={(sort: TArticleSort) => {
          setActiveSort(sort)
        }}
        selected={!!activeSort}
      />
      <ConditionSelector
        mode={CONDITION_MODE.CAT}
        active={activeCat}
        onSelect={(cat: TArticleCat) => {
          updateActiveFilter({ cat })
          refreshArticles()
        }}
        selected={!!activeCat}
      />
      <ConditionSelector
        mode={CONDITION_MODE.STATE}
        active={activeState}
        onSelect={(state: TArticleState) => {
          updateActiveFilter({ state })
          refreshArticles()
        }}
        selected={!!activeState}
      />
      <Space right={10} />
      <SpaceGrow />
      <DesktopOnly>
        {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading right={28} left={10} />}
      </DesktopOnly>
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && <SearchBox right={8} />}
      {bannerLayout === BANNER_LAYOUT.SIDEBAR && (
        <PublishButton
          text="参与讨论"
          mode={PUBLISH_MODE.SIDEBAR_LAYOUT_HEADER}
          onMenuSelect={(cat) => {
            callGEditor()
            setTimeout(() => callSyncSelector({ cat }), 500)
          }}
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
