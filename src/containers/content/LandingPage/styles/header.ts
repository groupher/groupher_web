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
  padding-left: 15px;
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
  opacity: 0.5;
  height: 8px;
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

export const Panel = styled.div`
  ${css.flexColumn()};
  gap: 3px 0;
  padding: 6px 4px;
  padding-left: 8px;
  width: 100px;
`

export const MenuItem = styled(Link)`
  ${css.flex('justify-between', 'align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
  padding: 4px 4px;
  text-decoration: none;

  &:hover {
    /* font-weight: 600; */
    cursor: pointer;
    background: ${theme('hoverBg')};
    text-decoration: none;
  }
`
