import { proxy, useSnapshot } from 'valtio'
import { pick, isEmpty, keys, mergeDeepRight } from 'ramda'

import type { TEditValue } from '~/spec'

import type {
  TStore,
  THeaderStatus,
  TSelectTypeStatus,
  TSetupDomainStatus,
  TSetupInfoStatus,
  TSetupExtraStatus,
  TFinishedStatus,
  TValidState,
  TCommunityType,
} from './spec'
import { STEP } from './constant'

type TRet = {
  count: number
  add: () => void
  communityTypeOnChange: (communityType: TCommunityType) => void
  isOfficalOnChange: (isOfficalValid: boolean) => void
  applyCommunity: () => void
  pervStep: () => void
  nextStep: () => void
  inputOnChange: (e: TEditValue, part: string) => void
} & TStore

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

  commit: (patch: Partial<TStore>): void => {
    Object.assign(store, mergeDeepRight(store, patch))
  },
})

export default (): TRet => {
  const snap = useSnapshot(store)

  const add = () => {
    store.count++
  }

  const checkIfCommunityExist = () => {
    const { slug } = store

    store.commit({ checking: true, communityExist: false })
    console.log('## check isCommunityExist: ', slug)
    // sr71$.query(S.isCommunityExist, { slug })
  }

  const pervStep = (): void => {
    const { step } = store

    if (step === STEP.SETUP_DOMAIN) store.commit({ step: STEP.SELECT_TYPE })
    if (step === STEP.SETUP_INFO) store.commit({ step: STEP.SETUP_DOMAIN })
    if (step === STEP.SETUP_EXTRA) store.commit({ step: STEP.SETUP_INFO })
  }

  const nextStep = (): void => {
    const { step } = store

    if (step === STEP.SELECT_TYPE) store.commit({ step: STEP.SETUP_DOMAIN })
    if (step === STEP.SETUP_DOMAIN) {
      checkIfCommunityExist()
    }
    if (step === STEP.SETUP_INFO) {
      store.commit({ step: STEP.SETUP_EXTRA })
    }
    if (step === STEP.SETUP_EXTRA) {
      applyCommunity()
    }
  }

  /**
   * change the type of the creating community
   * 改变创建社区类型
   * @public
   */
  const communityTypeOnChange = (communityType: TCommunityType): void => {
    store.commit({ communityType })
  }

  const isOfficalOnChange = (isOfficalValid: boolean): void => store.commit({ isOfficalValid })

  const applyCommunity = (): void => {
    const args = pick(['title', 'logo', 'desc', 'slug', 'applyMsg'], store)

    store.commit({ submitting: true })

    console.log('## applyCommunity: ', args)

    // sr71$.mutate(S.applyCommunity, {
    //   ...args,
    //   applyCategory: store.communityType,
    //   // tmp
    //   logo: 'https://assets.groupher.com/communities/groupher-alpha.png',
    // })
  }

  const inputOnChange = (e: TEditValue, part: string): void => {
    if (part === 'slug') {
      store.commit({ communityExist: false })
    }
    // @ts-ignore
    store.commit({ [part]: e?.target.value || e })
  }

  return {
    ...pick(keys(snap), snap),
    count: snap.count,
    add,
    pervStep,
    nextStep,
    communityTypeOnChange,
    isOfficalOnChange,
    applyCommunity,
    inputOnChange,
  }
}
