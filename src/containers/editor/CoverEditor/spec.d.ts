export type TImagePos =
  | 'top_left'
  | 'top_center'
  | 'top_right'
  | 'center_left'
  | 'center'
  | 'center_right'
  | 'bottom_left'
  | 'bottom_center'
  | 'bottom_right'

export type TImageCor = {
  top: string | number
  left: string | number
}

export type TSettingLevel = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export type TToolboxSetting = {
  pos: TImagePos
  shadowLevel: TSettingLevel
  borderRadiusLevel: TSettingLevel
}

export type TCoverImage = {
  pos: TImagePos
  shadowLevel: TSettingLevel
  borderRadiusLevel: TSettingLevel
}
