import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme, WIDTH } from '@/utils/css'
import { pixelAdd } from '@/utils/dom'

export const BaseWrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  min-height: 70vh;
  width: 100%;

  ${css.media.tablet`
    width: 100%;
    margin: 0;
    padding: .6em;
    padding-top: 0;
    padding-right: 0;
  `};
`
export const BaseInnerWrapper = styled.div`
  color: ${theme('font')};
  width: 100%;
  margin-top: 15px;
  padding-top: 0;

  ${css.media.mobile`
    margin: 0;
    padding: 0;
  `};
`
export const BaseContentWrapper = styled.div`
  ${css.flexColumn()};
  width: 100%;
`
export const Wrapper = styled(BaseWrapper)`
  ${css.flexColumn('justify-start', 'align-center')};

  ${css.media.mobile`
    padding-left: 0;
  `};
`
export const SidebarWrapper = styled(BaseWrapper)`
  ${css.flex('justify-start')};
`
export const MobileCardsWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  display: none;

  ${css.media.mobile`
    ${css.flexColumn()};
  `};
`
export const InnerWrapper = styled(BaseInnerWrapper)`
  max-width: ${pixelAdd(WIDTH.COMMUNITY.CONTENT, 46)};
  margin-left: ${WIDTH.COMMUNITY.CONTENT_OFFSET};

  /* 经典布局在统一宽度下再缩减 35px, 否则列表页会太宽 */
  padding-left: 35px;
  padding-right: 35px;

  ${css.media.mobile`
    display: none;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
  `};
`
export const ContentWrapper = styled(BaseContentWrapper)``
