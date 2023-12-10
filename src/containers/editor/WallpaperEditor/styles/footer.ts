import styled from 'styled-components'

import css, { theme } from '@/css'

import ForbidSVG from '@/icons/ForbidImg'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: calc(100% - 2px);
  border-radius: 5px;
  padding: 0 30px;
  position: fixed;
  bottom: 49px;
  left: 0;
  height: 50px;
  background: ${theme('htmlBg')};
  z-index: 10;

  border-top: 1px solid transparent;
  border-image: linear-gradient(
    0.22turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const InnrWrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  width: 100%;
  height: 100%;
`
export const ForbidImgIcon = styled(ForbidSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 10px;
`
