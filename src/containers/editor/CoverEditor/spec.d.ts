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

export type TToolboxSetting = {
  pos: TImagePos
}
