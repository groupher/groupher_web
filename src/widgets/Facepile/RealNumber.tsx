import { type FC, memo } from 'react'

import { prettyNum } from '@/fmt'
import { Wrapper, HighlightNumber } from './styles/real_number'

import type { TProps as TAvatarsProps } from '.'

type TProps = Pick<TAvatarsProps, 'size' | 'total'>

const RealNumber: FC<TProps> = ({ total, size }) => {
  return (
    <Wrapper total={total} size={size}>
      {total > 100 ? <HighlightNumber>{prettyNum(total)}</HighlightNumber> : prettyNum(total)}
    </Wrapper>
  )
}

export default memo(RealNumber)
