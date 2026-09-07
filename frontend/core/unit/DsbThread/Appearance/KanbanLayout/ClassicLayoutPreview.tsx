import { cn } from '~/css'

import useSalon from './salon/layout_selector'

const CLASSIC_COLUMNS = [
  ['opacity-35', 'opacity-20'],
  ['opacity-35', 'opacity-25', 'opacity-15', 'opacity-10'],
  ['opacity-35', 'opacity-25', 'opacity-15'],
] as const

export default function ClassicLayoutPreview() {
  const s = useSalon()

  return (
    <div className={s.boardGrid}>
      {CLASSIC_COLUMNS.map((cards) => (
        <div key={cards.join('|')} className={s.boardColumn}>
          <div className={s.boardContent}>
            {cards.map((opacity) => (
              <div key={opacity} className={cn(s.cardBase, 'h-7 w-full rounded', opacity)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
