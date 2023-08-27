import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/css'

type TWrapper = TActive

export const DesktopOnly = styled.div`
  ${css.flex('align-center', 'justify-between')};
  ${css.media.mobile`
    display: none;
  `};
`

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  height: 730px;
  padding: 0 12%;
  margin-top: -280px;
  position: relative;

  /* background: radial-gradient(circle at 75% 28%, #f0f9fe4d 0, transparent 20%); */

  // right
  /* background: radial-gradient(circle at 68% 50%, #e5847873 0, transparent 35%); */

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, #ccddefde 0, transparent 30%);
    opacity: ${({ $active }) => ($active ? 0.3 : 0)};
    transition: opacity 0.3s;
    transition-delay: 1s;
    z-index: -1;
  }

  ${css.media.mobile`
    ${css.flexColumn()};
    margin-top: 80px;
    padding: 0 18px;
    height: auto;

    &:after {
      display: none;
    }
  `};
`
export const Slogan = styled.div`
  ${css.flexColumn('align-both')};
`
