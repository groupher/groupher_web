import type { FC } from 'react'

import { roundUpNumber } from '~/fmt'
import type { TSpace, TPagi } from '~/spec'

import {
  Wrapper,
  InnerWrapper,
  ArrowLeftIcon,
  Main,
  Slash,
  Total,
  ArrowBlock,
  ArrowRightIcon,
  NumInputer,
} from './styles'

import type { TProps as TPagiProps } from '.'

type TProps = Pick<TPagiProps, 'onChange'> & TPagi & TSpace

const RealPagi: FC<TProps> = ({
  pageNumber,
  totalCount,
  pageSize,
  totalPages,
  onChange,
  ...restProps
}) => {
  const leftDisabled = pageNumber === 1
  const rightDisabled = pageNumber >= roundUpNumber(totalCount / pageSize)

  return (
    <Wrapper {...restProps}>
      <InnerWrapper>
        <ArrowBlock onClick={() => !leftDisabled && onChange(pageNumber - 1)}>
          <ArrowLeftIcon disabled={pageNumber === 1} />
        </ArrowBlock>

        <Main>
          <NumInputer
            type="number"
            min={1}
            max={999}
            value={pageNumber}
            onChange={(e) => onChange(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // @ts-ignore
                onChange(Number(e.target.value))
              }
            }}
          />
          <Slash>/</Slash>
          <Total>{totalPages}</Total>
        </Main>
        <ArrowBlock onClick={() => !rightDisabled && onChange(pageNumber + 1)}>
          <ArrowRightIcon disabled={rightDisabled} />
        </ArrowBlock>
      </InnerWrapper>
    </Wrapper>
  )
}

export default RealPagi
