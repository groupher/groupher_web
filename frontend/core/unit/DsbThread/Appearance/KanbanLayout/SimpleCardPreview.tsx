import { cn } from '~/css'
import CommentSVG from '~/icons/Comment'
import UpvoteSVG from '~/icons/Upvote'

import useSalon from './salon/item_card_layout'

type TProps = {
  isActive: boolean
}

export default function SimpleCardPreview({ isActive }: TProps) {
  const s = useSalon()

  return (
    <div className={s.block({ state: isActive ? 'active' : 'idle' })}>
      <div className={s.frame}>
        <div className={s.header}>
          <div className={cn(s.barBase, s.titleBar)} />
          <div className={cn(s.barBase, s.bodyBar)} />
        </div>

        <div className={s.footer}>
          <div className={s.footerLeft}>
            <UpvoteSVG className={s.icon} />
            <CommentSVG className={s.commentIcon} />
          </div>
          <div className={cn(s.barBase, s.simpleMetric)} />
        </div>
      </div>
    </div>
  )
}
