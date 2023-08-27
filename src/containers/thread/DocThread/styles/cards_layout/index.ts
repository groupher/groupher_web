import styled from 'styled-components'

import css, { theme } from '@/css'
import { MainWrapper } from '../index'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
  margin-top: 30px;
  margin-left: -30px;
`
export const CatsWrapper = styled(MainWrapper)`
  ${css.flex('justify-between')};
  flex-wrap: wrap;
  flex-grow: 1;
  gap: 20px 10px;

  width: 100%;
  min-height: 600px;
  margin-top: 8px;

  background: transparent;
  border-right: none;

  ${css.media.mobile`
    padding: 0;
  `};
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -5%;
  align-self: flex-start;
  margin-top: 60px;
  margin-bottom: 80px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.35turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
