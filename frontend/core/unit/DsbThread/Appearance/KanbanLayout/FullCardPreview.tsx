import { cn } from '~/css'
import CommentSVG from '~/icons/Comment'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon/item_card_layout'

type TProps = {
  isActive: boolean
}

export default function FullCardPreview({ isActive }: TProps) {
  const s = useSalon()

  return (
    <div
      className={cn('g-appearance-full-card', s.fullBlock, isActive && s.fullBlockActive)}
      data-state={isActive ? 'active' : 'idle'}
    >
      <div className={s.frame}>
        <div className={s.header}>
          <div className={cn(s.barBase, s.titleBar)} />
          <div className={s.headerRow}>
            <div className={cn(s.barBase, s.bodyBar)} />
            <div className={cn(s.barBase, s.sideBar)} />
          </div>
        </div>

        <div className={s.footer}>
          <div className={s.footerLeft}>
            <UpvoteSVG className={s.icon} />
            <div className={s.avatarList}>
              <div className={s.userAvatar} />
              <div className={cn(s.userAvatar, 'opacity-30')} />
              <div className={cn(s.userAvatar, 'opacity-20')} />
            </div>
          </div>

          <div className={s.footerRight}>
            <CommentSVG className={s.commentIcon} />
            <div className={cn(s.barBase, s.tinyMetric)} />
          </div>
        </div>
      </div>
    </div>
  )
}
