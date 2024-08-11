import type { FC } from 'react'

import type { TColorName } from '~/spec'
import { Brick } from '~/widgets/Common'
import ColorSelector from '~/widgets/ColorSelector'

import {
  Wrapper,
  ColorBox,
  ColorBall,
  Title,
} from '../../styles/dashboard_intros/layout_tab/header'

type TProps = {
  primaryColor: TColorName
  onPrimaryChange: (color: TColorName) => void
}

const Header: FC<TProps> = ({ primaryColor, onPrimaryChange }) => {
  return (
    <Wrapper>
      <ColorSelector
        activeColor={primaryColor}
        onChange={(color) => onPrimaryChange(color)}
        placement="bottom-start"
        offset={[0, 0]}
      >
        <ColorBox>
          <ColorBall $color={primaryColor} />
        </ColorBox>
      </ColorSelector>

      <Title>你的社区</Title>
      <div className="grow" />
      <Brick right={10} $opacity={0.15} $width={30} top={12} $color={primaryColor} />
    </Wrapper>
  )
}

export default Header
