import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flexColumn('align-both')};
  width: 100%;
  height: auto;
`
export const Slogan = styled.div`
  ${css.flexColumn('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 38px;
  font-weight: 500;
  position: relative;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;

  ${css.media.mobile`
    font-size: 22px;
  `};
`

export const Desc = styled.div`
  font-size: 17px;
  ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;

  ${css.media.mobile`
    font-size: 15px;
    text-align: center;
    padding: 0 20px;
    opacity: 0.6;
  `};
`
//
export const Wall = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
  margin-top: -120px;
`

export const FeatList = styled.div`
  ${css.flexColumn()};
  gap: 18px 0;
  margin-top: 28px;

  ${css.media.mobile`
    ${css.flex()};
  `};
`

export const MobileIntroLists = styled.div`
  ${css.flex()};
  flex-wrap: wrap;
  gap: 16px 0;
  padding-left: 10px;
  margin-top: -25px;
`
