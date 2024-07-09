import type { FC } from 'react'

import useLogic from '../useLogic'
import { Wrapper, LeftLine, RightLine } from '../styles/header/close_line'

type TProps = {
  curve: boolean
}

const CloseLine: FC<TProps> = ({ curve }) => {
  const { closeDrawer } = useLogic()

  return (
    <Wrapper onClick={() => closeDrawer()}>
      <LeftLine curve={curve} />
      <RightLine curve={curve} />
    </Wrapper>
  )
}

export default CloseLine
