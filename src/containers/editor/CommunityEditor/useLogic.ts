import { proxy, useSnapshot } from 'valtio'
import { pick, isEmpty } from 'ramda'

import type {
  TStore,
  THeaderStatus,
  TSelectTypeStatus,
  TSetupDomainStatus,
  TSetupInfoStatus,
  TSetupExtraStatus,
  TFinishedStatus,
  TValidState,
} from './spec'
import { STEP } from './constant'

type TRet = {
  count: number
  add: () => void
}

export const store = proxy<TStore>({
  count: 10,
  step: STEP.SELECT_TYPE,
  communityType: null,

  checking: false,
  submitting: false,
  isOfficalValid: false,

  communityExist: false,
  hasPendingApply: false,

  //
  slug: '',
  logo: null,
  title: '',
  homepage: '',
  extraInfo: '',

  city: '',
  source: '',

  desc: '',

  get applyMsg(): string {
    const { homepage, extraInfo } = store

    return `${homepage}\n${extraInfo}`
  },

  get headerStatus(): THeaderStatus {
    const { step, communityType } = store

    return {
      step,
      communityType,
      showStep: communityType !== null,
    }
  },

  get selectTypeStatus(): TSelectTypeStatus {
    const { communityType } = store

    return { communityType }
  },
  get setupDomainStatus(): TSetupDomainStatus {
    return pick(['slug', 'communityType'], store)
  },
  get setupInfoStatus(): TSetupInfoStatus {
    return pick(['slug', 'title', 'desc', 'logo', 'communityType'], store)
  },
  get setupExtraStatus(): TSetupExtraStatus {
    return pick(['homepage', 'extraInfo', 'city', 'source', 'communityType'], store)
  },
  get finishedStatus(): TFinishedStatus {
    return pick(['slug', 'title', 'desc', 'logo'], store)
  },
  get isCommunityTypeValid(): boolean {
    return true
  },
  get isRawValid(): boolean {
    if (store.communityExist) return false

    const rule = /^[0-9a-zA-Z-_]+$/
    return rule.test(store.slug)
  },
  get isTitleValid(): boolean {
    return !isEmpty(store.slug)
  },
  get isDescValid(): boolean {
    return !isEmpty(store.desc)
  },
  get isLogoValid(): boolean {
    // return store.logo && !isEmpty(store.logo)
    return true
  },
  get validState(): TValidState {
    return pick(
      [
        'isOfficalValid',
        'isCommunityTypeValid',
        'isRawValid',
        'isTitleValid',
        'isDescValid',
        'isLogoValid',
        'checking',
        'communityExist',
        'hasPendingApply',
        'submitting',
      ],
      store,
    )
  },
})

export default (): TRet => {
  const snap = useSnapshot(store)

  const add = () => {
    store.count++
  }

  // drived

  return {
    add,
    count: snap.count,
  }
}
