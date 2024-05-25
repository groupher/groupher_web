/* *
 * ChangelogThread
 *
 */

import { FC } from 'react'
import { observer } from 'mobx-react-lite'

import { BANNER_LAYOUT } from '@/const/layout'
import useBannerLayout from '@/hooks/useBannerLayout'

import ClassicLayout from './ClassicLayout'
import SimpleLayout from './SimpleLayout'

// const log = buildLog('C:ChangelogThread')

const ChangelogThread: FC = () => {
  const bannerLayout = useBannerLayout()

  return bannerLayout === BANNER_LAYOUT.TABBER ? <ClassicLayout /> : <SimpleLayout />
}

export default observer(ChangelogThread)
