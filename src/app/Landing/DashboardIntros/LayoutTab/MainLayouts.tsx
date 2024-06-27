import type { FC } from 'react'

import type { TColorName } from '~/spec'
import { Brick } from '~/widgets/Common'
import {
  Wrapper,
  Title,
  Layouts,
  Card,
} from '../../styles/dashboard_intros/layout_tab/main_layouts'

type TProps = {
  primaryColor: TColorName
}

const MainLayouts: FC<TProps> = ({ primaryColor }) => {
  return (
    <Wrapper>
      <Layouts>
        <Card>
          <Brick $height={4} $width={25} $opacity={0.4} left={10} top={10} $color={primaryColor} />
          <Brick $height={4} $width={20} $opacity={0.3} left={40} top={10} $color={primaryColor} />
          <Brick $height={4} $width={20} $opacity={0.2} left={63} top={10} $color={primaryColor} />
          <Brick $height={4} $width={8} $opacity={0.4} right={10} top={10} $color={primaryColor} />

          <Brick $height={82} $width={54} $opacity={0.2} left={10} top={26} $color={primaryColor} />
          <Brick
            $height={62}
            $width={25}
            $opacity={0.1}
            right={10}
            top={26}
            $color={primaryColor}
          />
        </Card>
        <Card>
          <Brick $height={16} $width={25} $opacity={0.1} left={10} top={10} $color={primaryColor} />
          <Brick
            $height={5}
            $width={25}
            $opacity={0.1}
            left={10}
            bottom={10}
            $color={primaryColor}
          />
          <Brick
            $height={55}
            $width={25}
            $opacity={0.15}
            left={10}
            top={32}
            $color={primaryColor}
          />
          <Brick
            $height={98}
            $width={54}
            $opacity={0.2}
            right={10}
            top={10}
            $color={primaryColor}
          />
        </Card>
        <Card>
          <Brick $height={22} $width={86} $opacity={0.1} left={10} top={10} $color={primaryColor} />

          <Brick $height={68} $width={54} $opacity={0.2} left={10} top={40} $color={primaryColor} />
          <Brick
            $height={48}
            $width={25}
            $opacity={0.1}
            right={10}
            top={40}
            $color={primaryColor}
          />
        </Card>
      </Layouts>
      <Title>整体布局</Title>
    </Wrapper>
  )
}

export default MainLayouts
