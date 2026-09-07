import { cn } from '~/css'

import useSalon from './salon'

type TProps = {
  title: string
}

export default function HeroContent({ title }: TProps) {
  const s = useSalon()

  return (
    <div className={s.mainCover}>
      <div className={s.coverHero} />
      <div className={s.coverHeader}>
        <div className={s.coverLead}>
          <div className={cn(s.barBase, s.coverAvatar)} />
          <h4 className={s.communityTitle}>{title}</h4>
        </div>
        <div className={cn(s.barBase, s.primaryBar, s.primaryChip, s.coverAction)} />
      </div>

      <div className={s.coverContent}>
        <div className={s.coverMain}>
          <div className={s.coverSection}>
            <div className={cn(s.barBase, s.contentTitle)} />
            <div className={cn(s.barBase, s.coverBodyShort)} />
          </div>
          <div className={s.coverSection}>
            <div className={cn(s.barBase, 'h-1.5 w-1/2 opacity-30')} />
            <div className={cn(s.barBase, s.coverBodyLong)} />
          </div>
          <div className={s.coverSection}>
            <div className={cn(s.barBase, s.contentTitle)} />
            <div className={cn(s.barBase, s.coverBodyLong)} />
          </div>
          <div className={s.coverSection}>
            <div className={cn(s.barBase, 'h-1.5 w-1/2 opacity-30')} />
            <div className={cn(s.barBase, 'h-1 w-1/3 opacity-20')} />
          </div>
        </div>

        <div className={s.rightRail}>
          <div className={cn(s.barBase, s.railItemShort)} />
          <div className={cn(s.barBase, s.railItemWide)} />
          <div className={cn(s.barBase, s.railItem)} />
          <div className={cn(s.barBase, s.footerItem, 'mt-auto')} />
        </div>
      </div>
    </div>
  )
}
