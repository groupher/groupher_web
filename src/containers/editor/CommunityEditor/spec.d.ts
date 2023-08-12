export type TCommunityType = 'WEB' | 'CLIENT' | 'HARDWARE' | 'GAME' | null

export type TStep = 'SELECT_TYPE' | 'SETUP_DOMAIN' | 'SETUP_INFO' | 'SETUP_EXTRA' | 'FINISHED'

export type TSelectTypeStatus = {
  communityType: TCommunityType
}

export type TSetupDomainStatus = {
  slug: string
}

export type TSetupInfoStatus = {
  slug: string
  title: string
  desc: string
  logo: string
  applyMsg: string
}

export type TSetupExtraStatus = {
  homepage: string
  extraInfo: string
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
  isLogin: boolean
  submitting: boolean
}
