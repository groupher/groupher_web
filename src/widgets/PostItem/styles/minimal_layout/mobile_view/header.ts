import styled from 'styled-components'

import css, { theme } from '@/css'

import { Wrapper as WrapperDesktop, Main as MainDesktop } from '../desktop_view/header'

export const Wrapper = styled(WrapperDesktop)``
export const Main = styled(MainDesktop)``

export const Title = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${theme('article.title')};
  max-width: 83%;
  ${css.lineClamp(1)};
`
