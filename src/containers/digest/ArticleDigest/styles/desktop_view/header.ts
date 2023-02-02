import styled from 'styled-components'
import Link from 'next/link'

import type { TMetric } from '@/spec'
import css, { theme, WIDTH } from '@/utils/css'

import AccountSVG from '@/icons/Acount'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  position: relative;
  background: transparent;
  border-bottom: ${theme('banner.spliter')};
  height: 60px;
  width: 100%;
  /* max-width: ${WIDTH.ARTICLE.PAGE}; */
  padding: 5px 150px;
`
export const Community = styled.div`
  ${css.flex('align-both')};
  width: 100px;
`
export const CommunityLogo = styled(Img)`
  ${css.size(20)};
`
export const CommunityTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
`

export const Main = styled.div<{ metric: TMetric }>`
  ${css.flex('align-both')};
  gap: 0 28px;
  width: 100%;
  ${({ metric }) => css.fitContentWidth(metric)};
  margin-left: -20px !important;
  height: 100%;
`
export const LinkItem = styled(Link)`
  font-size: 14px;
  color: ${theme('article.digest')};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: ${theme('article.title')};
  }
`

export const Account = styled.div``

const hoverEffect = `
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`

export const AccountIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(16)};
  margin-right: 14px;

  ${hoverEffect}
`
