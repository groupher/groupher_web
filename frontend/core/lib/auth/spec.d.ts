import type { AUTH_EVENT, AUTH_RECOVERY } from './constant'

export type TAuthEvent = (typeof AUTH_EVENT)[keyof typeof AUTH_EVENT]
export type TAuthRecovery = (typeof AUTH_RECOVERY)[keyof typeof AUTH_RECOVERY]

export type TAuthFailure = {
  code?: string
  status?: number
}

export type TBrowserSessionSummary = {
  browserFamily?: string | null
  createdCity?: string | null
  createdCountry?: string | null
  createdRegion?: string | null
  deviceFamily?: string | null
  insertedAt?: string | null
  isCurrent: boolean
  lastSeenCity?: string | null
  lastSeenCountry?: string | null
  lastSeenAt?: string | null
  lastSeenRegion?: string | null
  osFamily?: string | null
  publicRef: string
  status?: string | null
  userAgentSummary?: string | null
}

export type TLinkedOauthAccount = {
  publicRef: string
  provider: string
  login?: string | null
  nickname?: string | null
  avatar?: string | null
  canUnlink: boolean
  linkedAt: string
}
