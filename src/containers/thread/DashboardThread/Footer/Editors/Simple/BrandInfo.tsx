import { FC } from 'react'

import { buildLog } from '@/utils/logger'

import type { THeaderEditType } from '../../../spec'
import { HEADER_EDIT_TYPE } from '../../../constant'

import {
  Wrapper,
  LogoWrapper,
  Title,
  EditIcon,
} from '../../../styles/footer/editors/simple/brand_info'

const log = buildLog('C:Dashboard:BrandInfo')

type TProps = {
  editable?: boolean
  onEdit?: (type: THeaderEditType) => void
}

const BrandInfo: FC<TProps> = ({ editable = false, onEdit = log }) => {
  return (
    <Wrapper>
      <LogoWrapper>
        <EditIcon.Logo onClick={() => onEdit(HEADER_EDIT_TYPE.LOGO)} />
      </LogoWrapper>

      <Title>
        Groupher
        {editable && <EditIcon.Title onClick={() => onEdit(HEADER_EDIT_TYPE.TITLE)} />}
      </Title>
    </Wrapper>
  )
}

export default BrandInfo
