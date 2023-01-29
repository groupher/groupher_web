import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable, TActive } from '@/spec'

import css, { theme } from '@/utils/css'

// import Img from '@/Img'
import { LineDivider } from '@/widgets/Common'
import DemoSVG from '@/icons/DemoTV'
import ArrowSVG from '@/icons/ArrowSimple'
import GithubSVT from '@/icons/social/Github'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center', 'justify-between')};
  max-width: 1200px;
  padding: 0 30px;
  height: 68px;
  width: 100%;
  margin-bottom: 8%;
`
export const Brand = styled.div`
  ${css.flex('align-center')};
  width: 150px;
`

export const BrandTitle = styled.div`
  font-size: 18px;
  color: ${theme('article.title')};
  font-weight: 600;
`

export const LinksWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 28px;
  margin-top: 2px;
  flex-flow: 1;
  padding-left: 24px;
`
export const LinkItem = styled(Link)<TActive>`
  font-size: 15px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  text-decoration: none;

  &:hover {
    color: ${theme('article.title')};
    font-weight: 500;
  }

  transition: all 0.2s;
`

export const MoreLink = styled.div<TActive>`
  ${css.flex('align-center')};
  font-size: 15px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  cursor: default;

  &:hover {
    color: ${theme('article.title')};
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
  ${css.flex('align-center', 'justify-end')};
  width: 150px;
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
export const RequestDemo = styled.div`
  ${css.flex('align-end')};
  color: ${theme('article.digest')};
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
  ${css.flexColumn()};
  margin-top: 3px;
  margin-bottom: 3px;
  gap: 3px 0;
  padding: 6px 4px;
  padding-left: 8px;
  width: ${({ width }) => width};
`

export const MenuItem = styled(Link)<{ noDesc?: boolean }>`
  ${css.flexColumn('align-start')};
  font-size: 14px;

  padding: ${({ noDesc }) => (noDesc ? '6px 12px;' : '10px 12px')};

  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
    background: #e4e4e457;
    text-decoration: none;
    border-color: ${theme('popover.activeBorder')};
  }

  will-change: background;
`
export const MenuTitle = styled.div`
  color: ${theme('article.title')};
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
