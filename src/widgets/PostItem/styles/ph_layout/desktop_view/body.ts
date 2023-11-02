import styled from 'styled-components'

import css, { theme } from '@/css'

import { DesktopDigest } from '../..'

export const Wrapper = styled.div`
  margin-left: 10px;
  margin-top: -12px;
`
export const Extra = styled.li`
  position: relative;
  ${css.row('align-end')};
  color: ${theme('article.info')};
  margin-top: 5px;
  font-size: 12px;
`

export const Digest = styled(DesktopDigest)`
  ${css.cutRest('450px')};
  margin-top: 4px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 7px;
`
