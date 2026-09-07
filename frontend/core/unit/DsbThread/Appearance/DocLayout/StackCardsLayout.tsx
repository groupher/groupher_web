import { cn } from '~/css'

import useSalon from './salon/stack_cards_layout'

export default function StackCardsLayout() {
  const s = useSalon()

  return (
    <div className={s.block}>
      <div className={s.cardsRows}>
        <div className={s.cardsRow}>
          <div className={s.cardBox}>
            <div className={s.cardBody}>
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1.5 w-1/2 opacity-40')} />
              <div className={cn(s.barBase, 'h-1 w-3/5 opacity-20')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-15')} />
              <div className={cn(s.barBase, 'h-1 w-1/2 opacity-10')} />
            </div>
            <div className={s.cardFooter}>
              <div className={s.cardFooterBar} />
            </div>
          </div>

          <div className={s.cardBox}>
            <div className={s.cardBody}>
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1.5 w-2/5 opacity-40')} />
              <div className={cn(s.barBase, 'h-1 w-1/2 opacity-20')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-15')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-10')} />
            </div>
            <div className={s.cardFooter}>
              <div className={s.cardFooterBar} />
            </div>
          </div>

          <div className={s.cardBox}>
            <div className={s.cardBody}>
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1.5 w-2/5 opacity-40')} />
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1 w-1/2 opacity-15')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-10')} />
            </div>
            <div className={s.cardFooter}>
              <div className={s.cardFooterBar} />
            </div>
          </div>
        </div>

        <div className={s.cardsRow}>
          <div className={s.cardBox}>
            <div className={s.cardBody}>
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1.5 w-1/4 opacity-40')} />
              <div className={cn(s.barBase, 'h-1 w-1/2 opacity-20')} />
              <div className={cn(s.barBase, 'h-1 w-3/5 opacity-15')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-10')} />
            </div>
            <div className={s.cardFooter}>
              <div className={s.cardFooterBar} />
            </div>
          </div>

          <div className={s.cardBox}>
            <div className={s.cardBody}>
              <div className={cn(s.barBase, 'h-1 w-1/4 opacity-20')} />
              <div className={cn(s.barBase, 'h-1.5 w-3/5 opacity-40')} />
              <div className={cn(s.barBase, 'h-1 w-3/5 opacity-20')} />
              <div className={cn(s.barBase, 'h-1 w-2/5 opacity-15')} />
              <div className={cn(s.barBase, 'h-1 w-1/2 opacity-10')} />
            </div>
            <div className={s.cardFooter}>
              <div className={s.cardFooterBar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
