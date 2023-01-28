import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 10px 0;
  background: transparent;
  min-height: 100px;
  height: auto;

  margin-top: -10px;
  margin-bottom: 20px;

  border-bottom: 2px solid;
  border-bottom-color: ${theme('divider')};
`

export const holder = 1
