import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import CheckSVG from '@/icons/Check'

export { Bar, Circle } from '..'

export const FlatLayoutWrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
`
export const FlatLists = styled.div`
  ${css.flex()};
  flex-wrap: wrap;
  gap: 22px 0;
  width: 100%;
  margin-top: 15px;
`
export const CollapseLayoutWrapper = styled.div`
  width: 60%;
  margin-left: 26%;
`
export const FAQTitle = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 500;
`
export const Box = styled.div`
  width: 50%;
`
export const Box3 = styled.div`
  width: 33.3%;
`
export const CheckIcon = styled(CheckSVG)`
  ${css.size(10)};
  fill: ${theme('baseColor.green')};
  margin-right: 4px;
`
export const CollapseContent = styled.div`
  margin-left: 15px;
`
