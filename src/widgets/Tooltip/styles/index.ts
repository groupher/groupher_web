import Tippy from '@tippyjs/react'

import styled, { theme } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, fg, br, shadow } = useTwBelt()

  return {
    tooltip: cn(
      'relative p-1.5 rounded border backdrop-blur-sm cursor-default',
      shadow('xl'),
      fg('text.digest'),
      br('divider'),
    ),
  }
}

export const StyledTippy = styled(Tippy)<{ wechatEnv?: boolean }>`
  position: relative;
  color: ${theme('article.digest')};
  box-shadow: ${theme('popover.boxShadow')};
  /* outline: none; */
  max-width: 480px !important;

  border-radius: 5px;
  padding: 5px;

  border: 1px solid;
  border-color: ${theme('divider')};
  backdrop-filter: blur(5px);
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
