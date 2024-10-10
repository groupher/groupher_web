import type { FC } from 'react'

import BoldSVG from '~/icons/editor/Bold'
import StrikeSVG from '~/icons/editor/Strike'
import LinkSVG from '~/icons/editor/Link'
import HighlightSVG from '~/icons/editor/Highlight'

import useSalon, { cn } from '../../styles/feature_wall/rich_content/inline_tool_box'

type TProps = {
  hovering: boolean
}

const InlineToolBox: FC<TProps> = ({ hovering }) => {
  const s = useSalon()

  return (
    <div className={cn(s.wrapper, hovering && s.hover)}>
      <div className={s.item}>
        <BoldSVG className={s.icon} />
      </div>

      <div className={s.item}>
        <StrikeSVG className={s.icon} />
      </div>

      <div className={s.item}>
        <LinkSVG className={s.icon} />
      </div>

      <div className={cn(s.item, s.itemActive)}>
        <HighlightSVG className={cn(s.icon, s.iconActive)} />
      </div>
    </div>
  )
}

export default InlineToolBox
