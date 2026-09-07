import { cn } from '~/css'

import useSalon from './salon/cover_cards_layout'

export default function CoverCardsLayout() {
  const s = useSalon()

  return (
    <div className={s.block}>
      <div className={s.body}>
        <div className={cn(s.titleBase, 'w-1/5 opacity-40')} />
        <div className={cn(s.descBase, 'w-1/3 opacity-22')} />
        <div className={s.cards}>
          <div className={s.card}>
            <div className={s.cover} />
            <div className={s.cardTitle} />
            <div className={s.cardDesc} />
            <div className={cn(s.cardDescBase, 'w-3/5 opacity-20')} />
          </div>

          <div className={s.card}>
            <div className={s.cover} />
            <div className={cn(s.cardTitleBase, 'w-1/2 opacity-50')} />
            <div className={s.cardDesc} />
            <div className={cn(s.cardDescBase, 'w-1/5 opacity-20')} />
          </div>

          <div className={s.card}>
            <div className={s.cover} />
            <div className={s.cardTitle} />
            <div className={s.cardDesc} />
          </div>
        </div>
      </div>

      <div className={s.body}>
        <div className={s.title} />
        <div className={cn(s.descBase, 'w-1/2 opacity-22')} />
        <div className={s.cards}>
          <div className={s.card}>
            <div className={s.cover} />
            <div className={s.cardTitle} />
            <div className={s.cardDesc} />
          </div>

          <div className={s.card}>
            <div className={s.cover} />
            <div className={cn(s.cardTitleBase, 'w-1/3 opacity-50')} />
            <div className={s.cardDesc} />
          </div>
        </div>
      </div>
    </div>
  )
}
