import type { FC } from 'react'

import {
  Wrapper,
  Building,
  SadIcon,
  InternetIcon,
  Text,
  Dot,
} from '../../styles/enjoy_dev/high_way/block'

type TProps = {
  text: string
  noDot?: boolean
  type?: string
}

const Block: FC<TProps> = ({ text, noDot = false, type = '' }) => {
  return (
    <Wrapper $giveup={type === 'giveup'}>
      {type === 'online' && <InternetIcon />}
      {type === 'giveup' && <SadIcon />}
      {type === '' && (
        <Building role="img" aria-label="wip">
          🚧
        </Building>
      )}
      <Text $giveup={type === 'giveup'}>{text}</Text>
      {!noDot && <Dot />}
    </Wrapper>
  )
}

export default Block
