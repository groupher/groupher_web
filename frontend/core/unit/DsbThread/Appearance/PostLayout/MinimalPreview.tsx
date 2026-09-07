import { cn } from '~/css'
import CommentSVG from '~/icons/Comment'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon'
import type { TPreviewProps } from './spec'

export default function MinimalPreview({ isActive, compact }: TPreviewProps) {
  const s = useSalon({ compact })

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={cn(s.contentRow, 'items-start')}>
        <div className={s.upvoteBtn}>
          <UpvoteSVG className={s.upvoteIcon} />
          <div>N</div>
        </div>

        <div className={cn(s.textColumn, 'grow pt-1')}>
          <div className={cn(s.barBase, s.minimalTitleBar)} />
          <div className={cn(s.barBase, s.minimalBodyWide)} />
          <div className={cn(s.barBase, s.minimalBodyTiny)} />
        </div>

        <CommentSVG className={cn(s.iconBase, 'static size-3')} />
      </div>
    </div>
  )
}
