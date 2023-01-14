import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import { MainWrapper } from './index'

export const Wrapper = styled.div`
  ${css.flexColumn('align-both')};
  width: 100%;
  margin: 0 5%;
  margin-top: 10px;
`
export const CatsWrapper = styled(MainWrapper)`
  ${css.flex('justify-between')};
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

export const FAQWrapper = styled.div`
  margin-left: -10%;
  width: 95%;
  margin-bottom: 20px;
`
