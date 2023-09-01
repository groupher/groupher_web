import styled from 'styled-components'

import type { TTestable, TSpace } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = TTestable & TSpace & { width: string }
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  width: ${({ width }) => width};

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};

  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
`

export const RangeInput = styled.input`
  -webkit-appearance: none !important;
  width: 100%;
  height: 12px;
  background-color: ${theme('hoverBg')};
  border-radius: 10px;
  margin: auto;
  transition: all 0.3s ease;

  ::-webkit-slider-thumb {
    -webkit-appearance: none !important;
    ${css.circle(16)};
    background-color: ${theme('article.digest')};
    box-shadow: 0px 0px 3px #3c6d59;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  ::-webkit-slider-thumb:hover {
    background-color: ${theme('article.title')};
  }

  &:hover {
    background-color: ${theme('divider')};
  }
`
export const Value = styled.div`
  ${css.row('align-center')};
  font-size: 18px;
  color: ${theme('article.title')};
  margin-bottom: 15px;
  margin-left: 20px;
`

export const Unit = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-left: 5px;
  margin-top: 2px;
`
