import { type FC, useState } from 'react'
import Link from 'next/link'

import { DASHBOARD_ROUTE } from '~/const/route'

import useDashboardTab from '~/hooks/useDashboardTab'
import useViewingCommunity from '~/hooks/useViewingCommunity'

import ArrowSVG from '~/icons/ArrowSimple'

import type { TMenuGroup } from '../spec'

import useSalon, { cn } from '../styles/side_menu/group'

type TProps = {
  group: TMenuGroup
}

const Group: FC<TProps> = ({ group }) => {
  const { curTab, changeTab } = useDashboardTab()
  const community = useViewingCommunity()
  const [fold, setFold] = useState(group.initFold)

  const s = useSalon({ fold })

  return (
    <div className={s.wrapper}>
      <div className={s.folder} onClick={() => setFold(!fold)}>
        <div className={s.iconBox}>{group.icon}</div>
        <h3 className={s.title}>{group.title}</h3>
        <ArrowSVG className={s.arrowIcon} />
      </div>

      {!fold && (
        <div className={s.menu}>
          {group.children.map((item) => {
            const subPath = item.slug === DASHBOARD_ROUTE.DASHBOARD ? '' : item.slug
            const isActive = item.slug === curTab

            return (
              <Link
                key={item.slug}
                className={cn(s.item, isActive && s.itemActive)}
                onClick={() => changeTab(item.slug)}
                href={`/${community.slug}/${DASHBOARD_ROUTE.DASHBOARD}/${subPath}`}
              >
                {isActive && <div className={s.itemActiveBar} />}

                {item.title}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Group
