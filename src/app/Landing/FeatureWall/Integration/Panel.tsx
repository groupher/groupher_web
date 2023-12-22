import { FC } from 'react'

import { COLOR_NAME } from '@/constant/colors'
import { Brick } from '@/widgets/Common'

import Header from './Header'
import Sidebar from './Sidebar'
import EmbedScript from './EmbedScript'

import { Wrapper, BlocksWrapper } from '../../styles/feature_wall/integration/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper>
      <BlocksWrapper bottom={0} left={20} $hovering={hovering}>
        <Header />

        <Brick $width={60} $height={15} $radius={8} $opacity={0.5} top={40} left={20} />
        <Brick $width={96} $height={5} $radius={8} $opacity={0.12} top={66} left={20} />
        <Brick $width={68} $height={5} $radius={8} $opacity={0.1} top={80} left={20} />
        <Brick
          $width={35}
          $height={13}
          $radius={8}
          $opacity={0.5}
          top={96}
          left={20}
          $color={COLOR_NAME.RED}
        />

        <Brick $width={45} $height={54} $radius={4} $opacity={0.07} top={38} right={70} />
        <Brick $width={42} $height={70} $radius={4} $opacity={0.04} top={38} right={20} />

        <EmbedScript />

        <Sidebar hovering={hovering} />
      </BlocksWrapper>
    </Wrapper>
  )
}

export default Panel
