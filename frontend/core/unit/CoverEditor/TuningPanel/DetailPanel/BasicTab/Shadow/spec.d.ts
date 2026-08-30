import type { CSSProperties } from 'react'

import type { TCoverShadowColorMode, TCoverShadowPreset } from '../../../../spec'

export type TShadowPresetOption = {
  label: string
  value: TCoverShadowPreset
}

export type TShadowColorOption = {
  label: string
  value: TCoverShadowColorMode
}

export type TShadowPanelStyle = CSSProperties & {
  '--shadow-preview'?: string
}
