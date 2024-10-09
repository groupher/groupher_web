import styled, { css } from '~/css'
import type { TActive } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn } = useTwBelt()

  return {
    wrapper: cn('column-align-both w-full mt-32'),
    main: 'w-full relative overflow-hidden h-0',
    mainActive: 'h-full',
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
export const MobileIntroLists = styled.div`
  ${css.rowWrap()};
  gap: 16px 0;
  padding-left: 10px;
  margin-top: -25px;
`
export const HighlightWord = styled.span`
  font-weight: 450;
  margin-left: 2px;
  margin-right: 2px;
`
