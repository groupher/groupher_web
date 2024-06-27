import Link from 'next/link'

import type { TColorName, TTestable } from '~/spec'
import styled, { css, theme, rainbow } from '~/css'

import Input from '~/widgets/Input'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  margin-top: 40px;
  padding-bottom: 100px;
`
export const BasicInfo = styled.div`
  ${css.row('align-center')};
  margin-left: 28px;
  margin-bottom: 24px;
`
export const DotSelector = styled.div`
  ${css.circle(34)};
  ${css.row('align-both')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  background: ${theme('divider')};
  cursor: pointer;
`
export const TitleDot = styled.div<{ color: TColorName }>`
  ${css.circle(28)};
  background: ${({ color }) => rainbow(color, 'rainbow.blackRow')};
`
export const TitleInputer = styled(Input)`
  margin-left: 10px;
  width: 314px;
`

export const BannerTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-left: 26px;
  color: ${theme('article.title')};
`
export const SelectorWrapper = styled.div`
  padding: 0 28px;
  margin-top: 10px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('dashboard.menuCat')};
  font-weight: 600;
  padding-left: 28px;
  margin-bottom: 8px;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  padding: 0 28px;
  margin-bottom: 10px;
`
export const Navi = styled(Link)`
  font-size: 12px;
  color: ${theme('link')};
  text-decoration: none;
  cursor: pointer;
  margin-left: 1px;
  margin-right: 2px;
`

export const Inputer = styled(Input)`
  width: 100%;
  margin-left: 28px;
  width: 360px;
`
