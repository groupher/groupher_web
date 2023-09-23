import styled from 'styled-components'

import type { TSpace } from '@/spec'

import css, { theme } from '@/css'

export const Wrapper = styled.div<TSpace>`
  ${css.rowWrap('align-center')};
  gap: 0 8px;
  ${(props) => css.spaceMargins(props)};
`
export const Label = styled.div`
  border: 1px solid;
  color: ${theme('article.title')};
  border-color: ${theme('divider')};
  padding: 1px 8px;
  font-size: 13px;
  border-radius: 8px;
`
