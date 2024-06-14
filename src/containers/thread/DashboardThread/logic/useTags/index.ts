import type { TTag, TEditValue, TThread } from '@/spec'
import { THREAD } from '@/const/thread'

import type { TSettingField, TChangeTagMode } from '@/stores3/dashboard/spec'
import useSubState from '@/hooks/useSubStore'
import useViewingCommunity from '@/hooks/useViewingCommunity'
import { query } from '@/utils/api'

import useHelper from '../useHelper'
import S from '../../schema'

import useUtils from './useUtils'
import useDrived, { type TRet as TDrived } from './useDrived'

type TRet = {
  loading: boolean
  saving: boolean
  editingTag: TTag
  settingTag: TTag
  activeTagGroup: string
  activeTagThread: string

  loadTags: (thread?: TThread) => void
  edit: (value: TEditValue, field: TSettingField) => void
  changeThread: (thread: string) => void
  editTag: (key: TChangeTagMode, tag: TTag) => void

  moveTagUp: (tag: TTag) => void
  moveTagDown: (tag: TTag) => void
  moveTag2Top: (tag: TTag) => void
  moveTag2Bottom: (tag: TTag) => void
} & TDrived

export default (): TRet => {
  const store = useSubState('dashboard')
  const { edit } = useHelper()
  const curCommunity = useViewingCommunity()
  const drived = useDrived()
  const { moveTag, moveTag2Edge } = useUtils()

  const { loading, activeTagGroup, activeTagThread, editingTag, settingTag, saving, initSettings } =
    store

  const loadTags = (activeThread = THREAD.POST): void => {
    const community = curCommunity.slug
    const thread = activeThread.toUpperCase()

    const params = {
      filter: { community, thread },
    }

    store.commit({ loading: true })
    query(S.pagedArticleTags, params).then((data) => {
      const tags = data.pagedArticleTags.entries
      store.commit({ tags, initSettings: { ...initSettings, tags }, loading: false })
    })
  }

  const editTag = (key: TChangeTagMode, tag: TTag): void => store.commit({ [key]: tag })
  const changeThread = (thread: string) => store.commit({ activeTagThread: thread })

  const moveTagUp = (tag: TTag): void => moveTag(tag, 'up')
  const moveTagDown = (tag: TTag): void => moveTag(tag, 'down')
  const moveTag2Top = (tag: TTag): void => moveTag2Edge(tag, 'top')
  const moveTag2Bottom = (tag: TTag): void => moveTag2Edge(tag, 'bottom')

  return {
    loading,
    saving,
    editingTag,
    settingTag,
    activeTagThread,
    activeTagGroup,
    ...drived,
    changeThread,
    editTag,
    edit,
    // move actions
    moveTagUp,
    moveTagDown,
    moveTag2Top,
    moveTag2Bottom,
    loadTags,
  }
}
