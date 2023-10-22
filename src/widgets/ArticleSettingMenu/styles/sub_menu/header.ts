import styled from 'styled-components'

import InfoSVG from '@/icons/Info'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
  font-weight: 550;
  margin-top: 4px;
  margin-bottom: 15px;
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.title')};
  }
`
