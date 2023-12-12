import styled, { css, theme } from '@/css'

import TadaSVG from '@/icons/Tada'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-left: -160px;
`
export const Line = styled.div`
  width: 30px;
  height: 2px;
  margin: 0 4px;
  opacity: 0.5;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.25turn,
    transparent,
    ${theme('lightText')},
    ${theme('lightText')},
    ${theme('lightText')},
    transparent
  );

  border-image-slice: 1;
`

export const TadaIcon = styled(TadaSVG)`
  ${css.size(20)};
`
