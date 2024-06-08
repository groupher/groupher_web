import type { FC } from 'react'

import { Brick } from '@/widgets/Common'
import { Wrapper, Dot } from '../../styles/feature_wall/integration/header'

const Header: FC = () => {
  const top = 6

  return (
    <Wrapper top={5} left={0}>
      <Dot left={10} top={top} />
      <Dot left={20} top={top} />
      <Dot left={30} top={top} />

      <Brick $opacity={0.08} left={80} $width={90} $height={6} top={top - 1} />
      <Brick $opacity={0.06} right={15} $width={18} $height={4} top={top} />
    </Wrapper>
  )
}

export default Header
