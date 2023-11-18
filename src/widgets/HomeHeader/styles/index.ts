import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable, TActive } from '@/spec'

import css, { theme } from '@/css'

import Img from '@/Img'
import { LineDivider } from '@/widgets/Common'
import DemoSVG from '@/icons/DemoTV'
import ArrowSVG from '@/icons/ArrowSimple'
import GithubSVT from '@/icons/social/Github'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center', 'justify-between')};
  max-width: 1200px;
  padding: 0 30px;
  height: 68px;
  width: 100%;
  margin-bottom: 8%;

  ${css.media.mobile`
     padding: 0 14px;
  `};
`
export const Brand = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
  max-width: 150px;

  &:hover {
    text-decoration: none;
  }
`
export const BrandLogo = styled(Img)`
  ${css.size(22)};
  margin-right: 8px;

  ${css.media.mobile`
    ${css.size(16)};
    margin-right: 6px;
  `};
`
export const BrandTitle = styled.div`
  font-size: 18px;
  color: ${theme('article.title')};

  ${css.media.mobile`
    font-size: 15px;
  `};
`

export const LinksWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 24px;
  margin-top: 2px;
  flex-flow: 1;
  padding-left: 45px;

  ${css.media.mobile`
    display: none;
  `};
`
export const LinkItem = styled(Link)<TActive>`
  font-size: 15px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  text-decoration: none;
  padding: 2px 6px;
  border-radius: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    font-weight: 500;
  }

  transition: all 0.2s;
`

export const MoreLink = styled.div<TActive>`
  ${css.row('align-center')};
  font-size: 15px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  background: ${({ $active }) => ($active ? theme('hoverBg') : '')};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: default;
  padding: 2px 6px;
  border-radius: 5px;

  &:hover {
    background: ${theme('hoverBg')};
    font-weight: 500;
  }

  transition: all 0.2s;
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  transform: rotate(-90deg);
  margin-left: 4px;
  margin-top: 1px;

  ${LinkItem}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`

export const RightSideInfo = styled.div`
  ${css.row('align-center', 'justify-end')};
  width: 150px;

  ${css.media.mobile`
    display: none;
  `};
`
export const MobileRightSide = styled.div`
  ${css.row('align-both')};
  display: none;

  ${css.media.mobile`
    display: flex;
  `};
`

export const GithubIcon = styled(GithubSVT)`
  ${css.size(16)};
  fill: ${theme('article.digest')};
`
export const Divider = styled(LineDivider)`
  background: ${theme('article.digest')};
  opacity: 0.8;
  height: 10px;
`
export const RequestDemo = styled(Link)`
  ${css.row('align-end')};
  color: ${theme('article.digest')};
  text-decoration: none;

  font-size: 13px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }
  transition: all 0.2s;
`
export const DemoIcon = styled(DemoSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
  margin-bottom: 2px;

  ${RequestDemo}:hover & {
    fill: ${theme('article.title')};
  }
  transition: all 0.2s;
`

export const Panel = styled.div<{ width?: string }>`
  ${css.column()};
  margin-top: 3px;
  gap: 3px 0;
  padding: 6px 4px;
  padding-left: 8px;
  width: ${({ width }) => width};
`

export const MenuItem = styled(Link)<{ noDesc?: boolean }>`
  ${css.column('align-start')};
  font-size: 14px;

  padding: ${({ noDesc }) => (noDesc ? '6px 12px;' : '10px 12px')};

  text-decoration: none;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    background: ${theme('hoverBg')};
    text-decoration: none;
  }

  will-change: background;
`
export const MenuTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 500;
  opacity: 0.8;

  ${MenuItem}:hover & {
    opacity: 1;
    cursor: pointer;
  }
`
export const MenuDesc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 3px;

  ${MenuItem}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
