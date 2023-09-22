import styled from 'styled-components'

import type { TBannerLayout, TTestable } from '@/spec'
import css from '@/css'
import { BANNER_LAYOUT } from '@/constant'

type TWrapper = TTestable & { bannerLayout: TBannerLayout }
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.column('align-center')};
  width: ${({ bannerLayout }) =>
    bannerLayout === BANNER_LAYOUT.SIDEBAR ? 'calc(100% + 100px)' : '100px'};

  padding-left: ${({ bannerLayout }) =>
    bannerLayout === BANNER_LAYOUT.SIDEBAR ? '100px' : '50px'};
  margin-top: 10px;
  margin: ${({ bannerLayout }) => (bannerLayout === BANNER_LAYOUT.HEADER ? '0 6%;' : '0')};

  ${css.media.mobile`
    margin: 0;
    padding: 0;
  `};
`
export const MainWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 600px;

  background: transparent;
  border-radius: 6px;
  margin-top: 12px;
  padding-left: 25px;
  padding-right: 80px;

  ${css.media.mobile`
    padding-right: 0;
  `};
`
export const FAQWrapper = styled.div`
  margin-left: -5%;
  margin-bottom: 15px;
  max-width: 90%;

  ${css.media.mobile`
    margin-left: 0;
    max-width: 100%;
    margin-bottom: 0;
  `};
`
