import type { TLinkItem } from '@/spec'

export type TProps = {
  links: TLinkItem[]
}

export type TLinkGroup = {
  groupKey: string
  links: TLinkItem[]
  showMoreFold: boolean
}
