import styled from 'styled-components'

import css, { theme } from '@/css'
import { MainWrapper } from '..'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  margin-top: 30px;
  margin-left: 58px;
`
export const CatsWrapper = styled(MainWrapper)`
  ${css.row('justify-between')};
  flex-wrap: wrap;

  flex-grow: 1;
  width: 100%;
  min-height: 600px;
  margin-top: 8px;

  background: transparent;
  border-radius: 6px;
  padding-left: 22px;
  padding-right: 50px;

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
