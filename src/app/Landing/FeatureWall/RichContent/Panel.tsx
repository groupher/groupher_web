import type { FC } from 'react'

import Img from '~/Img'

import ToolBox from './ToolBox'
import InlineToolBox from './InlineToolBox'

import useSalon from '../../styles/feature_wall/rich_content/panel'

type TProps = {
  hovering: boolean
}

const Panel: FC<TProps> = ({ hovering }) => {
  const s = useSalon()

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <InlineToolBox hovering={hovering} />
        <ToolBox hovering={hovering} />
        <div className={s.header}>
          <div className={s.mention}>@老大</div>
          <span className={s.highlight} />
        </div>

        <div className={s.text}>推进器设计有点问题：</div>
        <Img src="landing/starship.png" className={s.pic} />
      </div>
    </div>
  )
}

export default Panel
