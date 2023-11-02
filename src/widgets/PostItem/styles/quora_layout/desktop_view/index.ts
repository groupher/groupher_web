import styled from 'styled-components'

import css, { theme } from '@/css'

import { DesktopHoverable, DesktopDigest } from '../..'

export const Wrapper = styled(DesktopHoverable)`
  padding: 8px 0;
  margin-bottom: 6px;
`
export const Main = styled.div`
  ${css.columnGrow()};
`
export const Digest = styled(DesktopDigest)`
  ${css.cutRest('530px')};
  margin-top: 6px;
  margin-bottom: 12px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
