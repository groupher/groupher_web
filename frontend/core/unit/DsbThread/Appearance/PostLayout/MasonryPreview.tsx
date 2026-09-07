import { cn } from '~/css'

import useSalon from './salon'
import type { TPreviewProps } from './spec'

export default function MasonryPreview({ isActive, compact }: TPreviewProps) {
  const s = useSalon({ compact })

  return (
    <div className={s.masonryBlock({ state: isActive ? 'active' : 'idle' })}>
      <div className={s.masonryGrid}>
        <div className={s.masonryCol}>
          <div className={cn(s.barBase, s.masonryTopBar)} />
          <div className={cn(s.barBase, s.masonryMainCard)} />
          <div className={cn(s.barBase, s.masonryBottomCard)} />
        </div>

        <div className={s.masonryCol}>
          <div className={cn(s.barBase, s.masonrySideTop)} />
          <div className={cn(s.barBase, s.masonrySideMain)} />
          <div className={cn(s.barBase, s.masonrySideBottom)} />
        </div>
      </div>
    </div>
  )
}
