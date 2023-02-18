import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex()};
  margin-top: 2px;
`
export const Brief = styled.div`
  ${css.flexGrow('align-center')};
  margin-bottom: 7px;
  margin-left: 10px;
  color: ${theme('article.title')};
`
export const Title = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${theme('article.title')};
  ${css.lineClamp(1)};
  width: 88%;

  transition: color 0.2s;
`
