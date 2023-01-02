import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
`
export const Logo = styled.div`
  ${css.size(30)};
  border-radius: 4px;
  background: ${theme('divider')};
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-weight: 600;
  font-size: 14px;
  margin-top: 15px;
`
