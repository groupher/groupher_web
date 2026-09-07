import { cn } from '~/css'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon'
import type { TPreviewProps } from './spec'

export default function ThreeColumnPreview({ isActive, compact }: TPreviewProps) {
  const s = useSalon({ compact })

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={cn(s.contentRow, 'items-start')}>
        <div className={cn(s.userAvatar, 'mt-0.5')} />

        <div className={cn(s.textColumn, 'grow pt-1')}>
          <div className={cn(s.barBase, s.phTitleBar)} />
          <div className={cn(s.barBase, s.phBodyWide)} />
          <div className={cn(s.barBase, s.phBodyTiny)} />
        </div>

        <div className={cn(s.upvoteBtn, compact ? '-mt-0.5' : 'scale-90 -mt-1')}>
          <UpvoteSVG className={s.upvoteIcon} />
          <div>N</div>
        </div>
      </div>
    </div>
  )
}
