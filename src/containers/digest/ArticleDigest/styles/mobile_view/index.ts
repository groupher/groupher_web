import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { theme } from '@/utils/css'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.nav.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('justify-center')};
  position: relative;
  background: transparent;
  border-bottom: ${theme('banner.spliter')};
  width: 100%;

  height: auto;
  margin-bottom: 16px;
  min-height: 240px;
`
export const InnerWrapper = styled.div`
  width: 100%;
`
export const BannerContent = styled.div`
  ${css.flex('justify-center')};
  width: 100%;
`
