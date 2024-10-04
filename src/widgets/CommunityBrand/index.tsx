import type { FC } from 'react'

import type { TSpace } from '~/spec'
import { assetSrc } from '~/helper'

import { BRAND_LAYOUT } from '~/const/layout'

import useViewingCommunity from '~/hooks/useViewingCommunity'
import useLayout from '~/hooks/useLayout'

import Img from '~/Img'
import ImgFallback from '~/widgets/ImgFallback'

import useSalon from './salon'

type TProps = {
  className?: string
} & TSpace

const CommunityBrand: FC<TProps> = ({ className = '', ...spacing }) => {
  const s = useSalon({ className, ...spacing })

  const { logo, title } = useViewingCommunity()
  const { brandLayout } = useLayout()

  return (
    <div className={s.wrapper}>
      {brandLayout !== BRAND_LAYOUT.TEXT && (
        <Img
          src={assetSrc(logo)}
          className={s.logo}
          noLazy
          fallback={<ImgFallback size={25} left={-2} right={6} title={title} />}
        />
      )}
      {brandLayout !== BRAND_LAYOUT.LOGO && <h1 className={s.title}>{title}</h1>}
    </div>
  )
}

export default CommunityBrand
