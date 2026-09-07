import { cn } from '~/css'
import AdminSVG from '~/icons/AdminStar'
import AirBallonSVG from '~/icons/AirBalloon'
import BillingSVG from '~/icons/Billing'
import BookSVG from '~/icons/Book'
import CmsSVG from '~/icons/CMS'
import MirrorSVG from '~/icons/Company'

import useSalon from './salon/brief_cards_layout'

export default function BriefCardsLayout() {
  const s = useSalon()
  const shortDesc = 'w-1/3'

  return (
    <div className={s.block}>
      <div className={cn(s.itemTitleBase, 'mb-3 w-1/4 opacity-40 ml-0.5')} />
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.iconBox}>
            <BookSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <AdminSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <BillingSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <AirBallonSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <CmsSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>
      </div>

      <div className={cn(s.itemTitleBase, 'mt-5 mb-3 w-1/5 opacity-40 ml-0.5')} />
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.iconBox}>
            <MirrorSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <AdminSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>
      </div>

      <div className={cn(s.itemTitleBase, 'mt-5 mb-3 w-1/5 opacity-40 ml-0.5')} />
      <div className={s.items}>
        <div className={s.item}>
          <div className={s.iconBox}>
            <BillingSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <AirBallonSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>

        <div className={s.item}>
          <div className={s.iconBox}>
            <CmsSVG className={s.icon} />
          </div>
          <div className={s.copy}>
            <div className={s.itemTitle} />
            <div className={s.itemDesc} />
            <div className={cn(s.itemDescBase, shortDesc, 'opacity-20')} />
          </div>
        </div>
      </div>
    </div>
  )
}
