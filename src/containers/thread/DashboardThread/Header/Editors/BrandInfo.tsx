import { FC } from 'react'

import type { TFooterLayout } from '@/spec'

import { FOOTER_LAYOUT } from '@/constant/layout'
import { buildLog } from '@/utils/logger'

import type { TFooterEditType } from '../../spec'
import { FOOTER_EDIT_TYPE } from '../../constant'

import {
  Wrapper,
  LogoWrapper,
  BaseInfo,
  DisplayOption,
  Title,
  EditIcon,
  Desc,
} from '../../styles/header/editors/brand_info'

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
        <Title>Groupher</Title>
        {footerLayout === FOOTER_LAYOUT.FULL && <Desc>让你的产品聆听用户的声音</Desc>}
      </BaseInfo>
      <DisplayOption onClick={() => onEdit(FOOTER_EDIT_TYPE.TITLE)}>显示选项</DisplayOption>
    </Wrapper>
  )
}

export default BrandInfo
