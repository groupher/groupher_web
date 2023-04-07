import styled from 'styled-components'

import type { TTestable, TMetric } from '@/spec'
import css, { WIDTH, theme } from '@/utils/css'

import { getDigestHeight } from './metric'

type TWrapper = { metric: TMetric } & TTestable
export const Wrapper = styled.nav.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('justify-start')};
  position: relative;
  background: transparent;
  min-height: ${({ metric }) => getDigestHeight(metric)};
  height: auto;

  margin-bottom: 24px;
  width: 100%;
  max-width: ${WIDTH.ARTICLE.PAGE};
  margin-left: 20px;
`
export const InnerWrapper = styled.div`
  width: 100%;
`
export const BannerContent = styled.div`
  ${css.flex('justify-center')};
  width: calc(100% - 360px);
  margin-left: 180px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
