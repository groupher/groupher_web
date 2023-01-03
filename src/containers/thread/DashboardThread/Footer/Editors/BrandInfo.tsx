import { FC } from 'react'

import type { TFooterLayout } from '@/spec'

import { FOOTER_LAYOUT, SOCIAL_LIST } from '@/constant'
import { buildLog } from '@/utils/logger'

import SocialList from '@/widgets/SocialList'

import {
  Wrapper,
  Logo,
  BaseInfo,
  Title,
  EditIcon,
  Desc,
} from '../../styles/footer/editors/brand_info'

const log = buildLog('C:Dashboard:BrandInfo')

type TProps = {
  editable?: boolean
  triggerEditor?: () => void
  footerLayout?: TFooterLayout
}

const BrandInfo: FC<TProps> = ({
  editable = false,
  triggerEditor = log,
  footerLayout = FOOTER_LAYOUT.SIMPLE,
}) => {
  return (
    <Wrapper>
      <Logo />
      <BaseInfo>
        <Title>
          Groupher
          {editable && <EditIcon onClick={() => triggerEditor()} />}
        </Title>
        {footerLayout === FOOTER_LAYOUT.FULL && (
          <Desc>一站式反馈社区解决方案，您产品的公共论坛，看板，更新日</Desc>
        )}
      </BaseInfo>
      {footerLayout === FOOTER_LAYOUT.FULL && (
        <SocialList
          top={24}
          selected={[SOCIAL_LIST.HOMEPAGE, SOCIAL_LIST.TWITTER, SOCIAL_LIST.BOSS]}
        />
      )}
    </Wrapper>
  )
}

export default BrandInfo
