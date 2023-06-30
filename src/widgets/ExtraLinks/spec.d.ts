import type { TLinkItem } from '@/spec'

export type TProps = {
  links: TLinkItem[]
}

export type TLinkGroup = {
  groupTitle: string
  links: TLinkItem[]
  showMoreFold: boolean
}
