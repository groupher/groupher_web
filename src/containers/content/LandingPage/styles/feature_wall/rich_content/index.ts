import styled from 'styled-components'

import css, { theme } from '@/css'

import { BaseCard } from '..'

export const Wrapper = styled(BaseCard)``
export const Footer = styled.div`
  ${css.column()};
  padding-left: 18px;
  margin-top: 10px;
  width: 100%;
  padding: 15px 10px;
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
`
