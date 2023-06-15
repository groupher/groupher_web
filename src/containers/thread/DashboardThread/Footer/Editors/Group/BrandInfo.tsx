import { FC } from 'react'

import type { TFooterLayout } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import { DEME_SOCIALS } from '@/constant/social'
import { buildLog } from '@/utils/logger'

import SocialList from '@/widgets/SocialList'

import type { TFooterEditType } from '../../../spec'
import { FOOTER_EDIT_TYPE } from '../../../constant'

import {
  Wrapper,
  LogoWrapper,
  SocialWrapper,
  BaseInfo,
  Title,
  EditIcon,
  Desc,
} from '../../../styles/footer/editors/group/brand_info'

const log = buildLog('C:Dashboard:BrandInfo')

type TProps = {
  editable?: boolean
  footerLayout?: TFooterLayout
  onEdit?: (type: TFooterEditType) => void
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
        {footerLayout === FOOTER_LAYOUT.GROUP && <Desc>让你的产品聆听用户的声音</Desc>}
      </BaseInfo>

      <SocialWrapper>
        {footerLayout === FOOTER_LAYOUT.GROUP && <SocialList selected={DEME_SOCIALS} />}
        <EditIcon.Social onClick={() => onEdit(FOOTER_EDIT_TYPE.SOCIAL)} />
      </SocialWrapper>
    </Wrapper>
  )
}

export default BrandInfo
