import { FC } from 'react'

import type { TFooterLayout } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import SOCIAL_LIST from '@/constant/social'
import { buildLog } from '@/utils/logger'

import SocialList from '@/widgets/SocialList'

import type { TFooterEditType } from '../../spec'
import { FOOTER_EDIT_TYPE } from '../../constant'

import {
  Wrapper,
  LogoWrapper,
  SocialWrapper,
  BaseInfo,
  Title,
  EditIcon,
  Desc,
} from '../../styles/footer/editors/brand_info'

const log = buildLog('C:Dashboard:BrandInfo')

type TProps = {
  editable?: boolean
  onEdit?: (type: TFooterEditType) => void
  footerLayout?: TFooterLayout
}

const BrandInfo: FC<TProps> = ({
  editable = false,
  onEdit = log,
  footerLayout = FOOTER_LAYOUT.SIMPLE,
}) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <EditIcon.Logo onClick={() => onEdit(FOOTER_EDIT_TYPE.LOGO)} />
      </LogoWrapper>

      <BaseInfo>
        <Title>
          Groupher
          {editable && <EditIcon.Title onClick={() => onEdit(FOOTER_EDIT_TYPE.TITLE)} />}
        </Title>
        {footerLayout === FOOTER_LAYOUT.FULL && (
          <Desc>一站式反馈社区解决方案，您产品的公共论坛，看板，更新日</Desc>
        )}
      </BaseInfo>

      <SocialWrapper>
        {footerLayout === FOOTER_LAYOUT.FULL && (
          <SocialList
            selected={[
              {
                type: SOCIAL_LIST.HOMEPAGE,
                addr: 'https://groupher.com',
              },
              {
                type: SOCIAL_LIST.TWITTER,
                addr: 'https://twitter.com',
              },
              {
                type: SOCIAL_LIST.BOSS,
                addr: 'https://zhipin.com',
              },
            ]}
          />
        )}
        <EditIcon.Social onClick={() => onEdit(FOOTER_EDIT_TYPE.SOCIAL)} />
      </SocialWrapper>
    </Wrapper>
  )
}

export default BrandInfo
