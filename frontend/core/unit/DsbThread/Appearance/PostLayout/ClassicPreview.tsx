import { cn } from '~/css'
import CommentSVG from '~/icons/Comment'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon'
import type { TPreviewProps } from './spec'

export default function ClassicPreview({ isActive, compact }: TPreviewProps) {
  const s = useSalon({ compact })

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={s.frame}>
        <div className={s.topRow}>
          <div className={s.header}>
            <div className={cn(s.barBase, s.metaBar)} />
            <div className={cn(s.barBase, s.titleBar)} />
            <div className={cn(s.barBase, s.bodyWide)} />
          </div>
          <CommentSVG className={s.commentIcon} />
        </div>

        <div className={s.footer}>
          <div className={s.footerLeft}>
            <UpvoteSVG className={s.upvoteIcon} />
            <div className={cn(s.barBase, s.scoreBar)} />
            <div className={cn(s.barBase, s.noteBar)} />
          </div>
        </div>
      </div>
    </div>
  )
}
