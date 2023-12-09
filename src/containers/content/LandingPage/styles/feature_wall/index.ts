import styled from 'styled-components'

import type { TTestable } from '@/spec'

import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column('align-both')};
  width: 100%;
  min-height: 700px;
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
export const BaseCard = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 300px;
  height: 246px;

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

  // border: 1px solid;
  // border-color: ${theme('divider')};
  // border-color: transparent;
  border-radius: 10px;
  background: ${theme('landing.greyBg')};
  position: relative;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    border-top: 1px solid transparent;
    border-image: linear-gradient(
      0.25turn,
      transparent,
      ${theme('hint')},
      ${theme('hint')},
      ${theme('hint')},
      transparent
    );
    border-image-slice: 1;
    transform: scale(1.01);
  }
  transition: all 0.2s;
`

export const CardsWrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  height: 500px;
  gap: 0 30px;
  margin-top: 60px;
  margin-bottom: 60px;
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
