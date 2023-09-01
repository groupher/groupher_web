import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { theme } from '@/css'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.nav.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('justify-center')};
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
  ${css.row('justify-center')};
  width: 100%;
`
