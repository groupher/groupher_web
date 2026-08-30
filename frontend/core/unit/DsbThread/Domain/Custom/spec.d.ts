import type { STEPS } from './constant'

export type TDnsRecord = {
  type: 'A' | 'TXT' | 'CNAME'
  host: string
  value: string
}

export type TDomainVerifyStatus = 'verifying' | 'verified' | 'failed'

export type TVerifyingDomainRow = {
  url: string
  status: TDomainVerifyStatus
  addedAt?: string | null
}

export type TStep = STEPS
export type TDomainStep = TStep
