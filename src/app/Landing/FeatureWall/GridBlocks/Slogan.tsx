import type { FC } from 'react'

import { Main, Topping, PlugIcon, PoinstIcon } from '../../styles/feature_wall/grid_blocks/slogan'

const Slogan: FC = () => {
  return (
    <>
      <Topping>
        <PlugIcon />
        Bizz~
      </Topping>
      <Main>
        除此之外，我们深知这些细节也至关重要，所以还内置了 <PoinstIcon />
      </Main>
    </>
  )
}

export default Slogan
