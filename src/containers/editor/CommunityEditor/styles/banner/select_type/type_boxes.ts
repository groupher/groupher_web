import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'
// import Img from '@/Img'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  margin-top: 30px;
  height: 105px;
  width: 700px;
`
export const Box = styled.div<TActive>`
  ${css.flexColumn('align-start', 'justify-between')};
  padding: 10px 12px;
  padding-right: 5px;
  width: ${({ active }) => (active ? '160px' : '154px')};
  height: ${({ active }) => (active ? '105px' : '100px')};
  border-radius: 5px;
  border: 1px solid;
  border-color: ${theme('article.digest')};

  border: ${({ active }) => (active ? '1px solid' : '1px solid')};
  border-top: ${({ active }) => (active ? '3px solid' : '1px solid')};

  border-color: ${({ active }) => (active ? theme('button.primary') : theme('lightText'))};
  box-shadow: ${({ active }) => (active ? 'rgba(0, 0, 0, 0.1) 0px 10px 50px;' : 'none')};
  &:hover {
    cursor: pointer;
    border: 1px solid;
    border-top: ${({ active }) => (active ? '3px solid' : '1px solid')};
    border-color: ${theme('button.primary')};
  }
  transition: all 0.2s;
`
export const HeaderText = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  font-size: 12px;
`
export const MainText = styled.div`
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: bold;
`
export const FooterText = styled.div`
  font-size: 13px;
`
