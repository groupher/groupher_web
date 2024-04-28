import styled, { css } from '@/css'

/**
 * see layout details:
 " @link https://css-tricks.com/the-fixed-background-attachment-hack/
 */
export const Skeleton = styled.div`
  height: 100vh;
  width: 100vw;
`
export const Wrapper = styled.div`
  ${css.row('justify-center')};
`
export const ScrollWrapper = styled.div<{ $noMobilePadding: boolean }>`
  position: absolute;
  width: 100%;

  ${css.media.mobile`
    width: calc(100% - 16px);
    margin-left: 8px;
  `};

  ${({ $noMobilePadding }) =>
    $noMobilePadding ? 'width: 100% !important; margin-left: 0 !important;' : ''};
`
