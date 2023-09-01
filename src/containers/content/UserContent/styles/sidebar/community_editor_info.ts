import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
  color: ${theme('banner.desc')};
  flex-wrap: wrap;
`

export const Text = styled.div`
  font-size: 0.9rem;
  margin-top: 1px;
  color: ${theme('article.digest')};
  margin-left: 3px;
`
export const MoreText = styled.div`
  font-size: 0.8rem;
  color: ${theme('article.digest')};
  margin-top: -5px;
`
