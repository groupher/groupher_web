import type { TCommunity } from '~/spec'

export type TInit = TCommunity

export type TStore = TInit & {
  hydrate: (confirmed: TInit) => void
}
