import type { TBannerLayout, TMetric } from '~/spec'
import { BANNER_LAYOUT } from '~/const/layout'

import styled, { css } from '~/css'

export default () => {
  return {
    wrapper: 'column-center justify-start',
    content: 'column w-full',
  }
}

const BaseInnerWrapper = styled.div<{ metric?: TMetric }>`
  ${({ metric }) => css.fitContentWidth(metric)};

  width: 100%;
  margin-top: 15px;
  padding-top: 0;
`
export const Wrapper = styled.div<{ metric?: TMetric }>`
  ${css.column('justify-start', 'align-center')};
`
export const SidebarWrapper = styled.div<{ metric: TMetric }>`
  ${css.row('justify-between')};
  ${({ metric }) => css.fitContentWidth(metric)};
`
export const InnerWrapper = styled(BaseInnerWrapper)<{ $bannerLayout?: TBannerLayout }>`
  ${({ $bannerLayout }) => ($bannerLayout === BANNER_LAYOUT.SIDEBAR ? 'width: 100%;' : '')};
`
