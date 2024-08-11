import { assetSrc } from '~/helper'
import { DEME_SOCIALS } from '~/const/social'
import { BRAND_LAYOUT } from '~/const/layout'

import useViewingCommunity from '~/hooks/useViewingCommunity'
import useLayout from '~/hooks/useLayout'

import Img from '~/Img'
import ImgFallback from '~/widgets/ImgFallback'
import SocialList from '~/widgets/SocialList'
import AccountUnit from '~/widgets/AccountUnit'

import useSalon from '../salon/tabber_layout/community_brief'

export default () => {
  const s = useSalon()

  const { logo, title, desc } = useViewingCommunity()
  const { brandLayout } = useLayout()

  const COVER_IMAGE = '' // '/banner-cover.webp'

  return (
    <div className={s.wrapper}>
      <div className={s.accountWrapper}>
        <AccountUnit />
      </div>
      {COVER_IMAGE ? (
        <Img className={s.cover} src={COVER_IMAGE} noLazy />
      ) : (
        <div className={s.coverHolder} />
      )}
      <div className={s.main}>
        {brandLayout !== BRAND_LAYOUT.TEXT && (
          <div className={s.logoBox}>
            <Img
              className={s.logo}
              src={assetSrc(logo)}
              fallback={<ImgFallback size={60} title={title} />}
            />
          </div>
        )}

        <div className={s.communityInfo}>
          {brandLayout !== BRAND_LAYOUT.LOGO && <h2 className={s.title}>{title}</h2>}
          <p className={s.digest}>{desc}</p>
        </div>
        <div className={s.socialWrapper}>
          <SocialList top={0} size="small" selected={DEME_SOCIALS} />
        </div>
      </div>
    </div>
  )
}
