import { type FC, memo, type ReactNode } from 'react'

import Menu from './Menu'

import { Wrapper } from './styles/options'

type TProps = {
  addon: ReactNode
}

const Options: FC<TProps> = ({ addon }) => {
  return (
    <Wrapper>
      {addon}
      <div className="grow" />
      <Menu />
    </Wrapper>
  )
}

export default memo(Options)
