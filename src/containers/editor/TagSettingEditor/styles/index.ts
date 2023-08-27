import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'
import { COLORS } from '@/constant/colors'
import css, { theme } from '@/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  margin-top: 40px;
  padding-bottom: 100px;
`
export const BasicInfo = styled.div`
  ${css.flex('align-center')};
  margin-left: 28px;
  margin-bottom: 24px;
`
export const DotSelector = styled.div`
  ${css.size(34)};
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  background: white;
  border-radius: 4px;
  cursor: pointer;
`
export const TitleDot = styled.div<{ color: string }>`
  ${css.size(24)};
  border-radius: 5px;
  background: ${({ color }) => COLORS[color]};
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
  color: ${theme('article.title')};
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
