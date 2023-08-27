import styled from 'styled-components'

import css, { theme } from '@/css'

import ForbidSVG from '@/icons/ForbidImg'

export const Wrapper = styled.div`
  ${css.flex('align-center', 'justify-between')};
  width: 100%;
  padding: 0 30px;
  padding-left: 25px;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid;
  border-top-color: ${theme('divider')};
  height: 58px;
`
export const ForbidImgIcon = styled(ForbidSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 10px;
`
