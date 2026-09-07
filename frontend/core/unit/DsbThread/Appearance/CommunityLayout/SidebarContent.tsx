import { cn } from '~/css'

import useSalon from './salon'

type TProps = {
  title: string
}

export default function SidebarContent({ title }: TProps) {
  const s = useSalon()

  return (
    <div className={s.frame}>
      <div className={s.nav}>
        <h4 className={s.communityTitle}>{title}</h4>
        <div className={s.navCenter}>
          <div className={cn(s.barBase, 'h-1.5 w-8 opacity-30')} />
          <div className={cn(s.barBase, s.primaryBar, s.primaryChip)} />
        </div>

        <div className={s.circle} />
      </div>

      <div className={s.mainSidebar}>
        <div className={s.sidebarNav}>
          <div className={cn(s.barBase, s.sideNavItem)} />
          <div className={cn(s.barBase, s.sideNavItemWide)} />
          <div className={cn(s.barBase, s.sideNavActive)} />
          <div className={cn(s.barBase, s.sideNavItem)} />
          <div className={cn(s.barBase, s.sideNavItem)} />
          <div className={cn(s.barBase, s.sideNavActive)} />
          <div className={cn(s.barBase, s.sideNavItem)} />
          <div className={cn(s.barBase, s.sidebarBottom, 'mt-auto')} />
        </div>

        <div className={s.vDivider} />

        <div className={s.sidebarMain}>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, 'h-1.5 w-1/2 opacity-30')} />
            <div className={cn(s.barBase, s.contentDigestShort)} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, s.contentTitle)} />
            <div className={cn(s.barBase, s.contentDigest)} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, 'h-1.5 w-24 opacity-30')} />
            <div className={cn(s.barBase, s.contentDigestShort)} />
            <div className={cn(s.barBase, 'h-1.5 w-16 opacity-30')} />
          </div>
          <div className={s.sectionBlock}>
            <div className={cn(s.barBase, 'h-1.5 w-24 opacity-30')} />
            <div className={cn(s.barBase, s.contentDigestShort)} />
            <div className={cn(s.barBase, 'h-1.5 w-16 opacity-30')} />
          </div>
        </div>
      </div>
    </div>
  )
}
