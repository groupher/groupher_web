import { FC } from 'react'

import LightBlock from './LightBlock'
import PositionBlock from './PositionBlock'
import BorderBlock from './BorderBlock'
import ShadowBlock from './ShadowBlock'
import SizeBlock from './SizeBlock'
import BackgroundBlock from './BackgroundBlock'
import RatioBlock from './RatioBlock'

import type { TToolboxSetting } from '../spec'
import { Wrapper } from '../styles/toolbox'

type TProps = {
  setting: TToolboxSetting
}

const Toolbox: FC<TProps> = ({ setting }) => {
  return (
    <Wrapper>
      <PositionBlock pos={setting.pos} />
      <LightBlock pos={setting.lightPos} />
      <SizeBlock size={setting.size} />
      <ShadowBlock shadowLevel={setting.shadowLevel} />
      <BorderBlock
        borderRadiusLevel={setting.borderRadiusLevel}
        linearBorderPos={setting.linearBorderPos}
        shadowLevel={setting.shadowLevel}
      />
      <RatioBlock ratio={setting.ratio} />
      <BackgroundBlock
        wallpapers={setting.wallpapers}
        wallpaper={setting.wallpaper}
        direction={setting.direction}
      />
    </Wrapper>
  )
}

export default Toolbox
