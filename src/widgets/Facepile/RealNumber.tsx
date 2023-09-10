import { FC, memo, Fragment } from 'react'

import { prettyNum } from '@/utils/fmt'
import { Wrapper, HighlightNumber } from './styles/real_number'

import type { TProps as TAvatarsProps } from '.'

type TProps = Pick<TAvatarsProps, 'size' | 'total'>

const RealNumber: FC<TProps> = ({ total, size }) => {
  return (
    <Wrapper total={total} size={size}>
      {total > 100 ? (
        <HighlightNumber>{prettyNum(total)}</HighlightNumber>
      ) : (
        <Fragment>{prettyNum(total)}</Fragment>
      )}
    </Wrapper>
  )
}

export default memo(RealNumber)
