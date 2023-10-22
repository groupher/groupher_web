import styled from 'styled-components'

import css, { theme } from '@/css'

import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 10px;
  max-width: 180px;
  padding: 5px 2px;
`
export const BackIcon = styled(ArrowSVG)`
  ${css.size(11)};
  fill: ${theme('lightText')};
  margin-right: 9px;
  margin-left: 4px;

  ${Wrapper}:hover & {
    cursor: pointer;
    fill: ${theme('article.title')};
  }
`
export const TagTitle = styled.div`
  color: ${theme('tags.text')};
  font-size: 12px;

  ${Wrapper}:hover & {
    cursor: pointer;
    color: ${theme('article.title')};
  }
`
