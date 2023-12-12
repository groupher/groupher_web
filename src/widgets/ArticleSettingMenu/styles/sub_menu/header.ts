import Link from 'next/link'

import InfoSVG from '@/icons/Info'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 13px;
  font-weight: 550;
  margin-top: 4px;
  margin-bottom: 15px;
`
export const Hint = styled.div`
  ${css.row('align-center')};
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(13)};
  fill: ${theme('article.digest')};
  margin-right: 3px;
  cursor: pointer;
`
export const Help = styled(Link)`
  color: ${theme('hint')};
  font-size: 12px;
  text-decoration: none;
  margin-right: 4px;
  opacity: 0.8;

  &:hover {
    color: ${theme('hint')};
    text-decoration: underline;
    cursor: pointer;
    opacity: 1;
  }
`
