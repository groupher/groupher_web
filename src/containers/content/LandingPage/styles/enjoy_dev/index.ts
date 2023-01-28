import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'

import GithubSVG from '@/icons/social/Github'
import ArrowSVG from '@/icons/Arrow'

import NoSVG from '@/icons/CloseCross'
import YesSVG from '@/icons/CheckBold'

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
`
export const Slogan = styled.div`
  ${css.flexColumn('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 38px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;
`
export const Desc = styled.div`
  ${css.flex('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`

export const LeanMoreLink = styled(Link)`
  ${css.flex('align-center')};
  font-size: 16px;
  text-decoration: none;
  color: ${theme('link')};

  &:hover {
    text-decoration: none;
    color: ${theme('link')};
    font-weight: 500;
  }
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(12)};
  fill: ${theme('link')};
  margin-left: 5px;

  transform: rotate(180deg);
  ${LeanMoreLink}:hover & {
    fill: ${theme('link')};
  }
`

export const Wall = styled.div`
  ${css.flexColumn('align-both')};
  width: 80%;
  height: auto;
  margin-top: 35px;
  position: relative;
`
export const BgWrapper = styled.div`
  opacity: 0.2;
  position: absolute;
  top: -20px;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  background-image: linear-gradient(#d9d9d9 1.5px, transparent 1.5px),
    linear-gradient(to right, #d9d9d9 1.5px, transparent 1.5px);
  background-size: 15px 15px;
  background-color: rgba(255, 255, 255, 0);

  border-radius: 30px;
`
export const BadWrapper = styled.div`
  ${css.flex('align-both')};
  gap: 15px 50px;
  height: 140px;
  width: 100%;
  padding: 40px 80px;
  margin-top: -20px;
`
export const GoodWrapper = styled.div`
  ${css.flex('align-both', 'justify-between')};
  position: relative;
  height: 560px;
  width: 1000px;
  padding-left: 40px;
  padding-right: 40px;
`
type TPos = { top: string; left: string }
export const PositionWrapper = styled.div<TPos>`
  position: absolute;
  left: ${({ left }) => left};
  top: ${({ top }) => top};
`
export const GithubLink = styled(Link)`
  ${css.flex('align-center')};
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  color: ${theme('article.title')};

  &:hover {
    color: ${theme('article.digest')};
    text-decoration: none;
  }
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(18)};
  fill: ${theme('article.title')};
  margin-right: 8px;
`

export const VS = styled.div`
  font-size: 50px;
  font-weight: 600;
  font-style: italy;
  font-style: italic;
  color: ${theme('article.digest')};
  opacity: 0.15;
  margin-top: 40px;
  margin-bottom: 50px;
`
const BottonNote = styled.div`
  ${css.flex('align-center')};
  margin-top: 8px;
  color: ${theme('article.digest')};
  font-size: 20px;
  position: relative;
  z-index: 1;

  &:before {
    content: ' ';
    display: block;
    height: 90%;
    width: 100%;
    margin-left: -3px;
    margin-right: -3px;
    position: absolute;
    background: rgba(234, 221, 6, 0.3);
    transform: rotate(2deg);
    top: -1px;
    left: -1px;
    border-radius: 20% 25% 20% 24%;
    padding: 10px 3px 3px 10px;
    z-index: -1;
  }
`

export const YesNote = styled(BottonNote)`
  color: ${theme('baseColor.green')};
  &:before {
    background: #d8ffca7a;
  }
`

export const NoNote = styled(BottonNote)`
  color: ${theme('baseColor.red')};

  &:before {
    background: #ffe7e79e;
  }
`

export const YesIcon = styled(YesSVG)`
  fill: ${theme('baseColor.green')};
  ${css.size(18)};
  margin-right: 8px;
  margin-left: -14px;
`
export const NoIcon = styled(NoSVG)`
  fill: ${theme('baseColor.red')};
  ${css.size(18)};
  margin-right: 8px;
  margin-left: -14px;
`
