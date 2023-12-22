import { FC } from 'react'

import { Wrapper } from '../../styles/feature_wall/integration/sidebar'

type TProps = {
  hovering: boolean
}

const Sidebar: FC<TProps> = ({ hovering }) => {
  return (
    <Wrapper right={hovering ? 5 : -88} top={4}>
      <div>Sidebar</div>
    </Wrapper>
  )
}

export default Sidebar
