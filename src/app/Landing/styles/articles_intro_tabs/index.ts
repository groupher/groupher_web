import styled, { css } from '~/css'
import type { TActive } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()

  return {
    wrapper: cn('column-align-both w-full mt-32'),
    main: 'align-both w-full relative overflow-hidden h-0',
    mainActive: 'h-full',
    featList: 'column gap-y-4 mt-7',
  }
}

export const MainContent = styled.div<TActive>`
  width: 100%;
  position: relative;
  height: ${({ $active }) => ($active ? '100%' : 0)};
  overflow: hidden;
`
export const FeatList = styled.div`
  ${css.column()};
  gap: 16px 0;
  margin-top: 28px;
`
export const HighlightWord = styled.span`
  font-weight: 450;
  margin-left: 2px;
  margin-right: 2px;
`
