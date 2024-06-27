import { type FC, memo } from 'react'

import { prettyNum } from '~/fmt'

import {
  Wrapper,
  NumberItem,
  // SubNumberWrapper,
  // SubNum,
} from './styles/volunteer_status'

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
