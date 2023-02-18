import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import { Wrapper as WrapperDesktop, Main as MainDesktop } from '../desktop_view'

export const Wrapper = styled(WrapperDesktop)``
export const Main = styled(MainDesktop)``
export const UpvoteWrapper = styled.div`
  width: 30px;
  margin-right: 18px;
  transform: scale(0.8);
`
export const DigestWrapper = styled.div`
  ${css.cutRest('210px')};
  color: ${theme('article.digest')};
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 13px;
`
