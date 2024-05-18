export type TCommunityType = 'WEB' | 'CLIENT' | 'HARDWARE' | 'GAME' | null

export type TStep = 'SELECT_TYPE' | 'SETUP_DOMAIN' | 'SETUP_INFO' | 'SETUP_EXTRA' | 'FINISHED'

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
