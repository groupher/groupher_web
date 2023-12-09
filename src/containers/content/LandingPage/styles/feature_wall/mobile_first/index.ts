import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center', 'justify-end')};
  width: 290px;
  height: 246px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  background: ${theme('landing.greyBg')};
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: ${theme('hint')};
  }
  transition: all 0.2s;
`
export const Header = styled.div`
  ${css.column()};
  width: 100%;
  padding: 15px 18px;
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
`
