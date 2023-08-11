import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import DashboardSVG from '@/icons/Dashboard'

export const Wrapper = styled.div`
  position: relative;
  ${css.flexColumn('align-both')};
  color: ${theme('article.digest')};
  /* background-image: linear-gradient(#043B49, #022A35); */
  background-image: ${theme('banner.linearGradient')};
  width: 100%;
  height: 500px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 550;
  margin-left: -10px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
`

export const Footer = styled.div`
  ${css.flex('align-center')};
  gap: 0 20px;
  margin-top: 50px;
`

export const DashboardIcon = styled(DashboardSVG)`
  fill: white;
  ${css.size(14)};
  margin-right: 10px;
`
