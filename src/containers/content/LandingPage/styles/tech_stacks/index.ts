import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

import GithubSVG from '@/icons/social/Github'
import ArrowSVG from '@/icons/Arrow'

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
  height: 440px;
  margin-top: 35px;
  position: relative;
`
export const BgWrapper = styled.div`
  opacity: 0.8;
  position: absolute;
  top: 0;
`
export const CADBackground = styled(Img)`
  width: 100%;
  height: 400px;
  border-radius: 50px;
  object-fit: cover;
`
export const TechsWrapper = styled.div`
  ${css.flex('align-both')};
  flex-wrap: wrap;
  gap: 15px 50px;
  height: 440px;
  width: 100%;
  padding: 40px 80px;
  margin-top: -20px;
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

export const BottonNote = styled.div`
  margin-top: 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
`
