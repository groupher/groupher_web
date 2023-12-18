import { FC, memo } from 'react'

import { prettyNum } from '@/fmt'
import { buildLog } from '@/logger'

import {
  Wrapper,
  NumberItem,
  // SubNumberWrapper,
  // SubNum,
} from './styles/volunteer_status'

const _log = buildLog('w:CommunityStatesPad:VolunteerStatus')

type TProps = {
  count?: number
  onClick?: () => void
}

const VolunteerStatus: FC<TProps> = ({ count = 0, onClick = null }) => {
  return (
    <Wrapper>
      <NumberItem readOnly={false} onClick={onClick}>
        {prettyNum(count)}
      </NumberItem>

      {/* <SubNumberWrapper>
        <SubNum>--</SubNum>
      </SubNumberWrapper> */}
    </Wrapper>
  )
}

export default memo(VolunteerStatus)
