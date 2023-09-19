import { FC } from 'react'

import { roundUpNumber } from '@/fmt'
import type { TSpace } from '@/spec'

import {
  Wrapper,
  InnerWrapper,
  ArrowLeftIcon,
  Main,
  Slash,
  Total,
  LeftArrow,
  LeftBar,
  RightArrow,
  RightBar,
  ArrowRightIcon,
  NumInputer,
} from './styles'

import type { TProps as TPagiProps } from '.'

type TProps = Pick<
  TPagiProps,
  'pageNumber' | 'totalCount' | 'pageSize' | 'onChange' | 'totalPages'
> &
  TSpace

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
        <LeftArrow onClick={() => !leftDisabled && onChange(pageNumber - 1)}>
          {!leftDisabled && <LeftBar />}
          <ArrowLeftIcon disabled={pageNumber === 1} />
        </LeftArrow>
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
        <RightArrow onClick={() => !rightDisabled && onChange(pageNumber + 1)}>
          {!rightDisabled && <RightBar />}
          <ArrowRightIcon disabled={rightDisabled} />
        </RightArrow>
      </InnerWrapper>
    </Wrapper>
  )
}

export default RealPagi
