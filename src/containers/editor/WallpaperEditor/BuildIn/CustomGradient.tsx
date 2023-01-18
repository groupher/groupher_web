import { FC, memo } from 'react'

import { Wrapper, Label, Inputer } from '../styles/build_in/custom_gradient'

// import { changeWallpaper } from '../logic'

type TProps = {
  wallpaper: string
}

const CustomGradient: FC<TProps> = ({ wallpaper }) => {
  return (
    <Wrapper>
      <Label>自定义</Label>
      <Inputer placeholder="颜色值以, 分隔, 如 #EBDDD1,#CEB2D3,#F16061" />
    </Wrapper>
  )
}

export default memo(CustomGradient)
