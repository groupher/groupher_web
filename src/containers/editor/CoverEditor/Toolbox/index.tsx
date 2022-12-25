import { FC } from 'react'

import TiltBlock from './TiltBlock'
import PositionBlock from './PositionBlock'
import ArchBlock from './ArchBlock'
import ShadowBlock from './ShadowBlock'
import SizeBlock from './SizeBlock'
import BgBlock from './BgBlock'
import RatioBlock from './RatioBlock'

import type { TToolboxSetting } from '../spec'
import { Wrapper } from '../styles/toolbox'

type TProps = {
  setting: TToolboxSetting
}

const Toolbox: FC<TProps> = ({ setting }) => {
  return (
    <Wrapper>
      <TiltBlock />
      <PositionBlock pos={setting.pos} />
      <SizeBlock />
      <ShadowBlock />
      <ArchBlock />
      <RatioBlock />
      <BgBlock />
    </Wrapper>
  )
}

export default Toolbox
