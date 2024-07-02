export type TCommunityType = 'WEB' | 'CLIENT' | 'HARDWARE' | 'GAME' | null

export type TStep = 'SELECT_TYPE' | 'SETUP_DOMAIN' | 'SETUP_INFO' | 'SETUP_EXTRA' | 'FINISHED'

// the locla state store types
export type TStore = {
  // TODO: remove
  count: number
  //

  step: TStep
  communityType: TCommunityType | null
  // if community exist / has pending apply
  checking: boolean
  submitting: boolean
  isOfficalValid: boolean

  communityExist: boolean
  hasPendingApply: boolean
  //
  slug: string
  logo: string
  title: string
  homepage: string
  extraInfo: string

  city: string
  source: string

  desc: string

  // drived
  applyMsg: string
  headerStatus: THeaderStatus
  selectTypeStatus: TSelectTypeStatus
  setupDomainStatus: TSetupDomainStatus
  setupInfoStatus: TSetupInfoStatus
  setupExtraStatus: TSetupExtraStatus
  finishedStatus: TFinishedStatus
  isCommunityTypeValid: boolean
  isRawValid: boolean
  isTitleValid: boolean
  isDescValid: boolean
  isLogoValid: boolean
  validState: TValidState

  // actions
  commit: (patch: Partial<TStore>) => void
}

export type THeaderStatus = {
  step: TStep
  showStep: boolean
  communityType: TCommunityType
}

export type TSelectTypeStatus = {
  communityType: TCommunityType
}

export type TSetupDomainStatus = {
  slug: string
  communityType: TCommunityType
}

export type TSetupInfoStatus = {
  slug: string
  title: string
  desc: string
  logo: string
  communityType: TCommunityType
}

export type TSetupExtraStatus = {
  homepage: string
  extraInfo: string
  city: string
  source: string
  communityType: TCommunityType
}

export type TFinishedStatus = {
  slug: string
  title: string
  desc: string
  logo: string
}

export type TValidState = {
  isCommunityTypeValid: boolean
  isOfficalValid: boolean
  isRawValid: boolean
  isTitleValid: boolean
  isDescValid: boolean
  isLogoValid: boolean
  checking: boolean
  communityExist: boolean
  hasPendingApply: boolean
  submitting: boolean
}
