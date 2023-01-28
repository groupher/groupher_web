import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ToolSVG from '@/icons/Tool'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  /* border: 1px solid; */
  border-color: ${theme('divider')};
  border-radius: 15px;
  width: auto;
  padding: 5px 10px;
  background-color: ${theme('alphaBg')};

  /* box-shadow: ${css.cardShadow}; */
  box-shadow: 0 5px 25px rgb(35 35 35 / 10%);
`

export const ToolIcon = styled(ToolSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  opacity: 0.7;
`

export const Text = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-left: 8px;
`
