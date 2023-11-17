import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

type TWrapper = TTestable & { color?: string }
export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.column('align-start')};
  width: 32%;
  min-height: 80px;
  padding: 16px 22px;

  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 7px;
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; */

  transition: all 0.2s;
  background: transparent;

  ${css.media.mobile`
    width: 50%;
    padding: 0;
    margin-bottom: 28px;
    padding: 0 22px;
  `};
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
