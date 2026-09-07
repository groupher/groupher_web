import { cn } from '~/css'
import CommentSVG from '~/icons/Comment'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon'
import type { TPreviewProps } from './spec'

export default function CoverPreview({ isActive, compact }: TPreviewProps) {
  const s = useSalon({ compact })

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={s.contentRow}>
        <div className={cn(s.barBase, s.coverMedia)} />

        <div className={cn(s.frame, 'grow')}>
          <div className={s.header}>
            <div className={cn(s.barBase, s.coverMeta)} />
            <div className={cn(s.barBase, s.coverTitle)} />
          </div>

          <div className={s.footer}>
            <div className={s.footerLeft}>
              <UpvoteSVG className={s.upvoteIcon} />
              <div className={cn(s.barBase, s.coverScore)} />
            </div>
            <div className={s.footerRight}>
              <CommentSVG className={cn(s.iconBase, 'static size-3.5')} />
              <div className={cn(s.barBase, s.coverNote)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
