/*
 *
 * ModeLineMenu
 *
 */

import type { FC } from 'react'

import type { TModelineType } from '@/spec'
import TYPE from '@/const/type'

// TODO: 全部动态加载
import GlobalMenu from './GlobalMenu/index'
import SearchMenu from './SearchMenu'
import MoreMenu from './MoreMenu'
import FilterMenu from './FilterMenu'
import CommunityMenu from './CommunityMenu'
import ExploreMenu from './ExploreMenu'
import ShareMenu from './ShareMenu'
import CollectMenu from './CollectMenu'
import ReportMenu from './ReportMenu'

import { useStore } from './store'
import { Wrapper } from './styles'
import { useInit } from './logic'

const renderMenus = (type, curActive, subscribedCommunities) => {
  switch (type) {
    case TYPE.MM_TYPE.MORE: {
      return <MoreMenu curActive={curActive} />
    }

    case TYPE.MM_TYPE.SEARCH: {
      return <SearchMenu />
    }

    case TYPE.MM_TYPE.FILTER: {
      return <FilterMenu curActive={curActive} />
    }

    case TYPE.MM_TYPE.COMMUNITY: {
      return <CommunityMenu community={curActive.community} />
    }

    case TYPE.MM_TYPE.EXPLORE: {
      return <ExploreMenu communities={subscribedCommunities} />
    }

    case TYPE.MM_TYPE.SHARE: {
      return <ShareMenu />
    }

    case TYPE.MM_TYPE.COLLECT: {
      return <CollectMenu />
    }

    case TYPE.MM_TYPE.REPORT: {
      return <ReportMenu />
    }

    default: {
      return <GlobalMenu />
    }
  }
}

type TProps = {
  type?: TModelineType
  testid?: string
}

const ModeLineMenu: FC<TProps> = ({
  testid = 'mode-line-menu',
  type = TYPE.MM_TYPE.GLOBAL_MENU,
}) => {
  const store = useStore()
  useInit(store)
  const { curActive, subscribedCommunities } = store

  return <Wrapper $testid={testid}>{renderMenus(type, curActive, subscribedCommunities)}</Wrapper>
}

export default ModeLineMenu
