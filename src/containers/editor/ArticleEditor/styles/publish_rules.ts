import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  color: ${theme('thread.articleDigest')};
  width: 280px;
  height: auto;
  margin-left: 20px;
`
export const Title = styled.div`
  font-size: 16px;
  color: ${theme('thread.articleTitle')};
  margin-bottom: 12px;
`
export const Ul = styled.ul`
  background-color: #093340;
  padding: 20px;
  padding-left: 35px;
  padding-right: 12px;
  padding-bottom: 10px;
  border-radius: 6px;
  border: 1px solid;
  border-color: #003b49;
  list-style: disc;
`
export const Li = styled.li`
  margin-bottom: 8px;
`
export const Footer = styled.div`
  font-size: 12px;
  color: ${theme('thread.articleTitle')};
  opacity: 0.6;
  margin-top: 10px;
`
