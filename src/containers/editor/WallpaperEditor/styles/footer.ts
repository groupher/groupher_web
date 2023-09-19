import styled from 'styled-components'

import css, { theme } from '@/css'

import ForbidSVG from '@/icons/ForbidImg'

export const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  padding: 0 10px;
  bottom: 50px;
  left: 0;
  height: 58px;
`
export const InnrWrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding: 0 25px;
`
export const ForbidImgIcon = styled(ForbidSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 10px;
`
