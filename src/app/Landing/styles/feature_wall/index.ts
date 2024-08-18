import type { TColor, TTestable } from '~/spec'

import styled, { css, theme, rainbow, gradientBg } from '~/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  padding: 120px 0;
  padding-bottom: 60px;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
  margin-bottom: 20px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 32px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  margin-bottom: 80px;
  opacity: 0.8;
`
export const BaseCard = styled.div<TColor>`
  ${css.column('align-center', 'justify-end')};
  width: 300px;
  height: 278px;
  background: ${({ $color }) => gradientBg($color)};
  border: 1px dotted;
  border-color: transparent;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    border-color: ${({ $color }) => rainbow($color)};
  }
  transition: all 0.2s;
`
export const CardsWrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 500px;
  gap: 0 36px;
`
export const FooterCards = styled(CardsWrapper)`
  height: 425px;
`
export const LeftCards = styled.div`
  ${css.row('align-start', 'justify-between')};
  flex-wrap: wrap;
  gap: 30px 20px;
  width: 630px;
`
export const RightCards = styled.div`
  ${css.row('align-both')};
`
