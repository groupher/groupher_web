import styled from 'styled-components'
import Link from 'next/link'

import type { TTestable } from '@/spec'

import css, { theme } from '@/utils/css'
import Img from '@/Img'

import GithubSVG from '@/icons/social/Github'

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
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`

export const Wall = styled.div`
  ${css.flexColumn('align-both')};
  width: 80%;
  height: 440px;
  margin-top: 35px;
  position: relative;
`
export const BgWrapper = styled.div`
  opacity: 0.25;
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
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  color: ${theme('article.title')};

  &:hover {
    color: ${theme('article.digest')};
    text-decoration: none;
  }
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(16)};
  fill: ${theme('article.title')};
  margin-right: 8px;
`
