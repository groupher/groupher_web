import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  margin-top: 100px;
  ${css.row('align-both')};
  width: 100%;
  height: 728px;
  background: ${theme('landing.greyBg')};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 35px;
    width: 100%;
    background: ${theme('htmlBg')};
    border-top: 1px solid;
    border-top-color: ${theme('hoverBg')};
    z-index: 2;
  }
`
export const Right = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
`
