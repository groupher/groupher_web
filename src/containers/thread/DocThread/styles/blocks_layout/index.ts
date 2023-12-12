import type { TBannerLayout } from '@/spec'
import { BANNER_LAYOUT } from '@/constant/layout'
import styled, { css, theme } from '@/css'

import { MainWrapper } from '..'

export const Wrapper = styled.div<{ $bannerLayout: TBannerLayout }>`
  ${css.column('align-both')};

  ${({ $bannerLayout }) => {
    switch ($bannerLayout) {
      case BANNER_LAYOUT.HEADER:
        return 'width: 100%; margin-left: 58px; margin-top: 30px;'

      case BANNER_LAYOUT.SIDEBAR:
        return 'width: auto'

      case BANNER_LAYOUT.TABBER:
        return 'width: 100%; margin-left: 15px;'

      default:
        return 'width: auto;'
    }

    return $bannerLayout !== BANNER_LAYOUT.SIDEBAR
      ? 'width: 100%; margin-left: 58px; margin-top: 30px;'
      : 'width: auto;'
  }}
`
export const CatsWrapper = styled(MainWrapper)<{ $bannerLayout?: TBannerLayout }>`
  ${css.rowWrap('justify-between')};

  flex-grow: 1;
  width: 100%;
  min-height: 600px;
  margin-top: 8px;

  background: transparent;
  border-radius: 6px;
  ${({ $bannerLayout }) =>
    $bannerLayout === BANNER_LAYOUT.TABBER
      ? 'padding-left: 0;padding-right: 0;'
      : 'padding-left: 22px;padding-right: 50px;'};

  border-right: none;

  ${css.media.mobile`
    padding: 0;
  `};
`

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -5%;
  align-self: flex-start;
  margin-top: 60px;
  margin-bottom: 80px;

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
