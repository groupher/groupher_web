import { FC } from 'react'

import { Main, Topping, PlugIcon, PoinstIcon } from '../../styles/feature_wall/grid_blocks/slogan'

const Slogan: FC = () => {
  return (
    <>
      <Topping>
        <PlugIcon />
        Charging ..
      </Topping>
      <Main>
        除此之外，我们从一开始就明白这些东西的重要性，所以还内置了 <PoinstIcon />
      </Main>
    </>
  )
}

export default Slogan
