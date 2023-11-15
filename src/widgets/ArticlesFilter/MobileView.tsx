/*
 *
 * ArticlesFilter
 *
 */

import { FC, Fragment, memo, useState } from 'react'

import type { TArticleCat, TArticleState } from '@/spec'

import { ARTICLE_CAT, ARTICLE_STATE } from '@/constant/gtd'
import { CONDITION_MODE } from '@/constant/mode'
import TYPE from '@/constant/type'

import { buildLog } from '@/logger'

import { SpaceGrow } from '@/widgets/Common'

import ConditionSelector from '@/widgets/ConditionSelector'
import SearchBox from '@/widgets/SearchBox'

import type { TProps } from '.'
import { Wrapper } from './styles/mobile_view'

/* eslint-disable-next-line */
const log = buildLog('w:ArticlesFilter:index')

const ArticlesFilter: FC<TProps> = ({ onSelect = log, resState = TYPE.RES_STATE.DONE }) => {
  const [activeCat, setActiveCat] = useState<TArticleCat>(ARTICLE_CAT.ALL)
  const [activeState, setActiveState] = useState<TArticleState>(ARTICLE_STATE.ALL)

  // const { activeThread } = useViewing()
  const searchMode = false

  return (
    <Wrapper>
      {!searchMode && (
        <Fragment>
          <ConditionSelector
            mode={CONDITION_MODE.CAT}
            selected={false}
            active={activeCat}
            onSelect={(cat: TArticleCat) => setActiveCat(cat)}
          />
          <ConditionSelector
            mode={CONDITION_MODE.STATE}
            selected={false}
            active={activeState}
            onSelect={(state: TArticleState) => setActiveState(state)}
          />
          <SpaceGrow />
        </Fragment>
      )}

      <SearchBox />
    </Wrapper>
  )
}

export default memo(ArticlesFilter)
