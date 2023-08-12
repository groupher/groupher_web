import { FC } from 'react'

import { Wrapper, Title, Desc } from '../../styles/banner/select_type/warn_box'

type TProps = {
  title: string
  desc: string
}

const WarnBox: FC<TProps> = ({ title, desc }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Wrapper>
  )
}

export default WarnBox
