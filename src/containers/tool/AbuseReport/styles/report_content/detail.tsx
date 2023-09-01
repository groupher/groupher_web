import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  flex-grow: 1;
  padding: 20px 30px;
  padding-top: 30px;
  background: ${theme('modal.subPanel')};
`
export const Title = styled.div`
  ${css.column()};
`
export const DetailDesc = styled.div`
  padding: 0 5px;
`
