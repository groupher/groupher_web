import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { WIDTH, theme } from '@/utils/css'

import { BaseBanner } from '../index'

type TWrapper = {
  isMobile: boolean
  metric?: TMetric
}
export const Wrapper = styled(BaseBanner)<TWrapper>`
  width: 380px;
  border-right: 1px solid transparent;
  border-image: linear-gradient(
    0.4turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`
export const ScrollArea = styled.div`
  width: 100%;
`
export const TabBarWrapper = styled.div`
  ${css.flex('align-center', 'justify-start')};
  margin-left: 42px;
  margin-top: 25px;
`
export const Divider = styled.div`
  height: 1px;
  width: 95%;
  margin-top: 20px;

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
