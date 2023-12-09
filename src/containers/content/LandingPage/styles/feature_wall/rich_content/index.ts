import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 290px;
  height: 246px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  background: ${theme('htmlBg')};
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: ${theme('hint')};
  }
  transition: all 0.2s;
`
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
