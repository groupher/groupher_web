import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  box-shadow: ${theme('button.boxShadow')};
  padding: 15px;
  width: 100%;
  height: 300px;
  background: ${theme('landing.greyBg')};

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
export const holder = 1
