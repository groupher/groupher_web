import styled from 'styled-components'

import css, { theme } from '@/css'

export { SeedIcon } from '../our_way'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  gap: 15px 0px;
  height: 140px;
  width: 100%;
  padding: 40px 80px;
  position: relative;
  margin-left: -10px;

  ${css.media.mobile`
    transform: scale(1.2);
  `};
`
export const DashLine = styled.div`
  width: 54px;
  height: 2px;
  margin-top: -1px;
  border-top: 3px dashed;
  margin-left: -3px;
  border-color: ${theme('divider')};
  filter: drop-shadow(2px 4px 6px lightgrey);
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
