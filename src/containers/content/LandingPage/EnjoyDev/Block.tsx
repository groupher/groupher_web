/* eslint-disable jsx-a11y/accessible-emoji */
import { FC } from 'react'

import { Wrapper, Building, SadIcon, InternetIcon, Text, Dot } from '../styles/enjoy_dev/block'

type TProps = {
  text: string
  noDot?: boolean
  type?: string
}

const Block: FC<TProps> = ({ text, noDot = false, type = '' }) => {
  return (
    <Wrapper grey={type === 'giveup'}>
      {type === 'online' && <InternetIcon />}
      {type === 'giveup' && <SadIcon />}
      {type === '' && (
        <Building role="img" aria-label="wip">
          🚧
        </Building>
      )}
      <Text>{text}</Text>
      {!noDot && <Dot />}
    </Wrapper>
  )
}

export default Block
