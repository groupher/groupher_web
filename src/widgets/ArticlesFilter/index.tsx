/*
 *
 * ArticlesFilter
 *
 */

import type { TArticleCat, TArticleOrder, TArticleState } from '~/spec'
import { refreshArticles, callGEditor, callSyncSelector } from '~/signal'
import { PUBLISH_MODE } from '~/const/publish'
import { CONDITION_MODE } from '~/const/mode'
import TYPE from '~/const/type'
import { BANNER_LAYOUT } from '~/const/layout'

import usePagedPosts from '~/hooks/usePagedPosts'
import useLayout from '~/hooks/useLayout'
import useArticlesFilter from '~/hooks/useArticlesFilter'

import { Space, SpaceGrow } from '~/widgets/Common'
import PublishButton from '~/widgets/Buttons/PublishButton'
import ConditionSelector from '~/widgets/ConditionSelector'
import SearchBox from '~/widgets/SearchBox'
import LavaLampLoading from '~/widgets/Loading/LavaLampLoading'

import useSalon from './salon'

export default () => {
  const s = useSalon()

  const { resState } = usePagedPosts()
  const { bannerLayout } = useLayout()

  const {
    cat: activeCat,
    state: activeState,
    order: activeOrder,
    updateActiveFilter,
  } = useArticlesFilter()

  return (
    <div className={s.wrapper}>
      <ConditionSelector
        mode={CONDITION_MODE.ORDER}
        active={activeOrder}
        onSelect={(order: TArticleOrder) => {
          updateActiveFilter({ order })
          refreshArticles()
        }}
        selected={!!activeOrder}
        prefixIcon="sort"
        right={0.5}
      />
      <ConditionSelector
        mode={CONDITION_MODE.CAT}
        active={activeCat}
        onSelect={(cat: TArticleCat) => {
          updateActiveFilter({ cat })
          refreshArticles()
        }}
        selected={!!activeCat}
        prefixIcon="catetory"
        right={0.5}
      />
      <ConditionSelector
        mode={CONDITION_MODE.STATE}
        active={activeState}
        onSelect={(state: TArticleState) => {
          updateActiveFilter({ state })
          refreshArticles()
        }}
        selected={!!activeState}
        prefixIcon="status"
      />
      <Space right={10} />
      <SpaceGrow />
      {resState === TYPE.RES_STATE.LOADING && <LavaLampLoading right={28} left={10} />}
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
    </div>
  )
}
