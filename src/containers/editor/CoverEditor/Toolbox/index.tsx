import TiltBlock from './PositionBlock'
import PositionBlock from './TiltBlock'
import ArchBlock from './ArchBlock'
import ShadowBlock from './ShadowBlock'
import SizeBlock from './SizeBlock'
import BgBlock from './BgBlock'

import { Wrapper } from '../styles/toolbox'

const Toolbox = () => {
  return (
    <Wrapper>
      <TiltBlock />
      <PositionBlock />
      <SizeBlock />
      <ShadowBlock />
      <ArchBlock />
      <BgBlock />
    </Wrapper>
  )
}

export default Toolbox
