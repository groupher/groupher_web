import { cn } from '~/css'

import useSalon from './salon/layout_selector'

const WATERFALL_GROUPS = [
  {
    headerWidth: 'w-full',
    titleWidth: 'w-16 opacity-30',
    rows: [
      { left: 'w-32 opacity-30', right: 'w-8 opacity-20' },
      { left: 'w-24 opacity-20', right: 'w-8 opacity-10' },
    ],
  },
  {
    headerWidth: 'w-full',
    titleWidth: 'w-10 opacity-40',
    rows: [
      { left: 'w-32 opacity-30', right: 'w-8 opacity-20' },
      { left: 'w-24 opacity-20', right: 'w-8 opacity-10' },
    ],
  },
  {
    headerWidth: 'w-full',
    titleWidth: 'w-12 opacity-25',
    rows: [{ left: 'w-12 opacity-10', right: 'w-8 opacity-10' }],
  },
] as const

export default function WaterfallLayoutPreview() {
  const s = useSalon()

  return (
    <div className={s.waterfall}>
      {WATERFALL_GROUPS.map((group) => (
        <div key={`${group.headerWidth}-${group.titleWidth}`} className={s.waterfallGroup}>
          <div className={cn(s.waterfallMain, group.headerWidth)}>
            <div className={cn(s.waterfallTitle, group.titleWidth)} />
          </div>

          {group.rows.map((row) => (
            <div key={`${row.left}-${row.right}`} className={s.waterfallRow}>
              <div className={cn(s.waterfallMeta, row.left)} />
              <div className={cn(s.waterfallMeta, row.right)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
