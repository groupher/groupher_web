import styled, { css, theme } from '@/css'

import { BaseCard } from '..'

export const Wrapper = styled(BaseCard)<{ $hovering: boolean }>`
  background: ${({ $hovering }) =>
    $hovering
      ? 'linear-gradient(66deg,#fffff35c 13%,#d5faffd9 100%)'
      : 'linear-gradient(213deg,#fffff35c 13%,#d5faffd9 100%)'};
        transition: all 0.3s;
`

export const Footer = styled.div`
  ${css.column()};
  width: 100%;
  padding: 15px 10px;
  padding-left: 15px;
  padding-top: 0;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  opacity: 0.8;
`
