import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 400px;
  height: auto;
  padding: 20px;
  background: ${theme('hoverBg')};
  border-radius: 10px;
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: bold;
  margin-bottom: 20px;
`
export const Ul = styled.ul`
  margin-left: 4px;
`
export const Li = styled.li`
  font-size: 13px;
  color: ${theme('article.title')};
  list-style: circle inside;
  margin-bottom: 10px;
`
