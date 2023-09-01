import styled from 'styled-components'

// import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
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
