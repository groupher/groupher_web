import styled from 'styled-components'

import css from '@/utils/css'

export { FeatList, MobileOnly, DesktopOnly } from '..'

export const MobileWrapper = styled.div`
  ${css.flex()};
  flex-wrap: wrap;
  gap: 16px 0;
  padding-left: 10px;
  margin-top: -25px;
`
