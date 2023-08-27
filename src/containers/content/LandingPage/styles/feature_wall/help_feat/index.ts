import styled from 'styled-components'

import type { TActive, TTestable } from '@/spec'

import css from '@/css'

type TWrapper = TActive

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  height: 730px;
  padding: 0 12%;
  margin-top: -280px;
  position: relative;

  /* background: ${({ $active }) =>
    $active
      ? 'radial-gradient(circle at 68% 50%, #e5847873 0, transparent 35%),radial-gradient(circle at 20% 30%, #ffdbbb4a, transparent 20%);'
      : 'radial-gradient(circle at 20% 30%, #ffdbbb4a, transparent 20%)'}; */

  background: radial-gradient(circle at 75% 50%, #c6be9a26 0, transparent 20%);

  // right
  /* background: radial-gradient(circle at 68% 50%, #e5847873 0, transparent 35%); */

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, #faf1e7 0, transparent 30%);
    opacity: ${({ $active }) => ($active ? 0.8 : 0)};
    transition: opacity 0.5s;
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
