import styled, { css, theme } from '@/css'

import type { TSpace } from '@/spec'
// import InfoSVG from '@/icons/Info'

export const Wrapper = styled.ul<TSpace>`
  ${css.column()};
  width: 100%;
  ${(props) => css.spaceMargins(props)};
`
export const Item = styled.li`
  font-size: 14px;
  color: ${theme('article.title')};
  list-style: circle;
  margin-bottom: 4px;
`
