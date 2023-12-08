import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  min-height: 800px;
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 32px;
  font-weight: 500;

  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;
  opacity: 0.9;

  ${css.media.mobile`
    font-size: 22px;
    font-weight: 600;
  `};
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  opacity: 0.8;
`
export const CardsWrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 500px;
  gap: 0 25px;
  margin-top: 60px;
  margin-bottom: 150px;
`
export const LeftCards = styled.div`
  ${css.row('align-start')};
  flex-wrap: wrap;
  gap: 25px;
  width: 45%;
`
export const RightCards = styled.div`
  ${css.row('align-both')};
  flex-wrap: wrap;
`
