'use client'

import { BANNER_LAYOUT } from '~/const/layout'

import useLayout from '~/hooks/useLayout'
import CommunityDigest from '~/widgets/CommunityDigest'

import useSalon from './salon'

export default ({ children }) => {
  const s = useSalon()
  const { bannerLayout } = useLayout()

  return (
    <div className={s.wrapper}>
      {BANNER_LAYOUT.TABBER !== bannerLayout && <CommunityDigest />}
      <div className={s.content}>{children}</div>
    </div>
  )
}
