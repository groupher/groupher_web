import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

type TWrapper = TTestable & { color?: string }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('align-start')};
  width: 280px;
  min-height: 80px;

  z-index: 2;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; */

  transition: all 0.2s;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -3px;
    width: 275px;
    z-index: 0 !important;
    height: 50%;
    border: 1px solid;
    border-color: ${theme('divider')};
    background: ${theme('alphaBg2')};
    border-radius: 6px;
    transform: rotate(-2deg);
  }
`
export const InnerWrapper = styled.div`
  padding: 16px 22px;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 7px;
  z-index: 10;
`
export const Header = styled.div`
  ${css.column()};
  margin-bottom: 12px;
`
export const UpdateDate = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
`
export const Topping = styled.div`
  ${css.row('align-center', 'justify-between')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  font-weight: 500;
  margin-top: 6px;

  ${css.media.mobile`
    font-size: 15px;
  `};
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-top: 6px;

  ${css.media.mobile`
    font-size: 15px;
  `};
`
export const ItemsWrapper = styled.div`
  margin-top: 6px;
  ${css.column()};
  gap: 12px;
  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  height: 32px;
  width: 100%;
  border-radius: 5px;
  margin-top: 15px;
`
export const Item = styled.div<{ color: string }>`
  ${css.lineClamp(1)};
  color: ${theme('article.digest')};
  font-size: 14px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
