import styled from 'styled-components'

import type { TMetric } from '@/spec'
import css, { theme } from '@/css'

import { SexyDivider } from '@/widgets/Common'

import { BaseBanner } from '..'

type TWrapper = {
  isMobile: boolean
  metric?: TMetric
  narrow?: boolean
}
export const Wrapper = styled(BaseBanner)<TWrapper>`
  ${({ narrow }) =>
    narrow
      ? 'width: 220px;max-width: 220px;margin-left: -30px;'
      : 'width: 280px;max-width: 280px;margin-left: -50px;'};

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
export const InnerWrapper = styled.div`
  margin-top: 20px;
`

export const TabBarWrapper = styled.div`
  ${css.row('align-center', 'justify-start')};
  margin-left: 10px;
  transform: scale(1.05);
`
export const Divider = styled(SexyDivider)`
  width: 200px;
  margin-left: -10px;
`
export const FileTreeWrapper = styled.div`
  margin-top: 20px;
`
