import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  padding: 80px 0;
  padding-bottom: 100px;
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
`
export const Desc = styled.div`
  ${css.row('align-center')};
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  margin-bottom: 80px;
  opacity: 0.8;
`
export const BaseCard = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 300px;
  height: 246px;

  border: 1px solid;
  border-color: transparent;

  border-top: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );
  border-image-slice: 1;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};

  border-radius: 10px;
  background: ${theme('landing.greyBg')};
  position: relative;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    border: 1px solid;
    border-color: ${theme('hint')};
    box-shadow: ${theme('button.boxShadow')};
  }
  transition: all 0.2s;
`

export const CardsWrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 500px;
  gap: 0 30px;
`
export const LeftCards = styled.div`
  ${css.row('align-start', 'justify-between')};
  flex-wrap: wrap;
  gap: 30px 20px;
  width: 630px;
`
export const RightCards = styled.div`
  ${css.row('align-both')};
`
