import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 280px;
  height: 450px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  background: #fbfbfb;
`
export const Banner = styled.div`
  ${css.column()};
  padding-left: 22px;
  margin-bottom: 10px;
  width: 100%;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
`
