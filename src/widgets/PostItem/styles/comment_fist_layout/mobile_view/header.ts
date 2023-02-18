import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { Wrapper as WrapperDesktop, Brief as BriefDesktop } from '../desktop_view/header'

export const Wrapper = styled(WrapperDesktop)``

export const Brief = styled(BriefDesktop)``

export const Title = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${theme('article.title')};
  ${css.lineClamp(1)};
  width: 88%;

  transition: color 0.2s;
`
