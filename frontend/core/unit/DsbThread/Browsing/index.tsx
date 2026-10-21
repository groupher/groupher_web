import { DSB_COVERS, DSB_ROUTE } from '~/const/route'
import useDsbCrumbItems from '~/hooks/useDsbCrumbItems'
import useTrans from '~/hooks/useTrans'

import Portal from '../Portal'
import useSalon, { cn } from '../salon'
import Settings from './Settings'

/** Community-wide browsing preferences, independent of individual content threads. */
export default function Browsing() {
  const s = useSalon()
  const { t } = useTrans()
  const crumbs = useDsbCrumbItems({
    title: 'dsb.crumb.workplace',
    seg: DSB_ROUTE.BROWSING,
    toSeg: DSB_COVERS.WORKPLACE,
  })
  return (
    <div className={cn(s.content, 'w-2/5')}>
      <Portal title={t('dsb.pagi.browsing')} desc={t('dsb.pagi.description')} crumbItems={crumbs} />
      <Settings />
    </div>
  )
}
