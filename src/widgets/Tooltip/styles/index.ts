import Tippy from '@tippyjs/react'

import styled, { theme } from '~/css'

export const StyledTippy = styled(Tippy)<{ wechatEnv?: boolean }>`
  position: relative;
  color: ${theme('article.digest')};
  box-shadow: ${theme('popover.boxShadow')};
  outline: none;
  max-width: 480px !important;

  border-radius: 5px;
  padding: 5px;

  border: 1px solid;
  border-color: ${theme('divider')};
  backdrop-filter: blur(5px);

  .tippy-arrow {
    display: none;
  }
`
export const NoPaddingStyledTippy = styled(StyledTippy)`
  padding: 0;

  .tippy-content {
    padding: 0;
  }
`
type TContentWrapper = { $contentHeight: string; $forceZIndex: boolean }
export const ChildrenWrapper = styled.div<TContentWrapper>`
  position: relative;
  height: ${({ $contentHeight }) => $contentHeight};
  z-index: ${({ $forceZIndex }) => ($forceZIndex ? 1 : 0)};
`
export const ContentWrapper = styled.div<{ $hasMaxWidth: boolean }>`
  max-width: ${({ $hasMaxWidth }) => ($hasMaxWidth ? '180px' : 'auto')};
`
