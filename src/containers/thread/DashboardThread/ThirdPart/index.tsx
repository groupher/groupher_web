import { type FC, memo } from 'react'

import { Wrapper } from '../styles/third_part'

const ThirdPart: FC = () => {
  return (
    <Wrapper>
      <div>ThirdPart</div>
    </Wrapper>
  )
}

export default memo(ThirdPart)
