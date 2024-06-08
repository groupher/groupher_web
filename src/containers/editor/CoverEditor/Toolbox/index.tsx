import type { FC } from 'react'

import LightBlock from './LightBlock'
import PositionBlock from './PositionBlock'
import BorderBlock from './BorderBlock'
import ShadowBlock from './ShadowBlock'
import SizeBlock from './SizeBlock'
import RatioBlock from './RatioBlock'
import RotateBlock from './RotateBlock'
import ActionBlock from './ActionBlock'
import BackgroundBlock from './BackgroundBlock'

import type { TToolboxSetting } from '../spec'
import { Wrapper } from '../styles/toolbox'

type TProps = {
  setting: TToolboxSetting

  onDelete: () => void
  onReplace: () => void
}

const Toolbox: FC<TProps> = ({ setting, onDelete, onReplace }) => {
  return (
    <Wrapper>
      <PositionBlock pos={setting.pos} />
      <SizeBlock size={setting.size} />
      <ShadowBlock shadowLevel={setting.shadowLevel} />
      <BorderBlock
        borderRadiusLevel={setting.borderRadiusLevel}
        linearBorderPos={setting.linearBorderPos}
        shadowLevel={setting.shadowLevel}
        hasGlassBorder={setting.hasGlassBorder}
      />
      <RatioBlock ratio={setting.ratio} />
      <RotateBlock rotate={setting.rotate} />
      <LightBlock pos={setting.lightPos} />
      <BackgroundBlock
        wallpapers={setting.wallpapers}
        wallpaper={setting.wallpaper}
        direction={setting.direction}
      />
      <ActionBlock onDelete={onDelete} onReplace={onReplace} />
    </Wrapper>
  )
}

export default Toolbox
