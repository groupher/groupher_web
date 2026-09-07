export type TContentShadowInit = boolean | null | undefined

export type TStore = {
  enabled: boolean
  original: boolean
  commit: (enabled: boolean) => void
  acceptSubmitted: (submitted: boolean) => void
  reconcileConfirmed: (confirmed: TContentShadowInit) => void
}
