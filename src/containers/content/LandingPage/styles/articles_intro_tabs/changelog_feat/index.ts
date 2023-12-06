import styled from 'styled-components'

import { FEAT } from '../../../constant'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  width: 100%;
  position: relative;

  *::selection {
    background-color: ${FEAT.CHANGELOG.COLOR} !important;
    color: white;
  }
`
export const Slogan = styled.div`
  ${css.column('align-both')};
`
