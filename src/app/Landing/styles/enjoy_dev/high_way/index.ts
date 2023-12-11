import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  gap: 15px 0px;
  height: 140px;
  width: 100%;
  padding: 40px 80px;
  margin-top: 10px;

  ${css.media.mobile`
    transform: scale(1.2);
  `};
`
export const ConnectLine = styled.div`
  width: 60px;
  height: 2px;
  margin-top: -1px;

  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')}
  );

  border-image-slice: 1;
`
