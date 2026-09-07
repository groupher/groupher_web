import { cn } from '~/css'

import useSalon from './salon'

type TProps = {
  title: string
}

export default function ClassicContent({ title }: TProps) {
  const s = useSalon()

  return (
    <div className={s.frame}>
      <div className={s.nav}>
        <h4 className={s.communityTitle}>{title}</h4>
        <div className={cn(s.barBase, s.navBar)} />
        <div className={s.circle} />
      </div>
      <div className={cn(s.hDivider, 'mt-1.5 mb-5')} />

      <div className={s.mainClassic}>
        <div className={s.contentColumn}>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, s.contentTitleWide)} />
            <div className={cn(s.barBase, s.contentDigest)} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, s.contentTitle)} />
            <div className={cn(s.barBase, s.contentDigestShort)} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, s.contentTitle)} />
            <div className={cn(s.barBase, s.contentDigestWide)} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, s.contentTitleWide)} />
            <div className={cn(s.barBase, s.contentDigestShort)} />
          </div>
        </div>

        <div className={s.vDivider} />

        <div className={s.rightRail}>
          <div className={cn(s.barBase, s.primaryBar, s.primaryChip)} />
          <div className={cn(s.barBase, s.railItemShort)} />
          <div className={cn(s.barBase, s.railItemWide)} />
          <div className={cn(s.barBase, s.railItem)} />
          <div className={cn(s.barBase, s.footerItem)} />
        </div>
      </div>
    </div>
  )
}
