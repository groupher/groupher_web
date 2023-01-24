import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { theme } from '@/utils/css'

import { SexyDivider } from '@/widgets/Common'

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
export const TabBarWrapper = styled.div`
  ${css.flex('align-center', 'justify-start')};
  margin-left: 42px;
  margin-top: 20px;
`
export const Divider = styled(SexyDivider)`
  width: 180px;
  margin-left: 32px;
`
export const FileTreeWrapper = styled.div`
  padding-left: 32px;
  margin-top: 20px;
`
