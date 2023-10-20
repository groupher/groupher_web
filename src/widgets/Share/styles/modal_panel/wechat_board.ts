import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-center')};
  height: 100%;
  color: ${theme('article.title')};
`
export const QRCodeWrapper = styled.div`
  width: 160px;
`
export const DescWrapper = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
`
export const DescTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 10px;
`
