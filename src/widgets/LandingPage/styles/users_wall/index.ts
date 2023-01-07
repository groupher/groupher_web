import styled from 'styled-components'

import type { TColorName, TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
`
export const Slogan = styled.div`
  ${css.flexColumn('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 38px;
  font-weight: 500;
`
export const Desc = styled.div`
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`
//
export const Wall = styled.div`
  ${css.flexColumn('align-both')};
  margin-top: 30px;
  width: 100%;
  height: auto;

  background: radial-gradient(circle at 50% 50%, #e58a7894 0, transparent 35%),
    radial-gradient(circle at 80% 30%, #ffeba824 0, transparent 40%);
`

export const DempP = styled.div`
  line-height: 1.75;
  font-size: 15px;
  p {
    margin-top: 10px;
  }
`
export const Hightlight = styled.span<{ color: TColorName }>`
  color: ${theme('article.title')};
  font-weight: 500;
  padding: 0 2px;
  background-color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
`
