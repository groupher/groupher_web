import styled from 'styled-components'

// import css from '@/css'

import { WrapperBase, ScrollWrapperBase, ShadowBarBase } from '.'
import { getShadowBackground, getShadowSize, getScrollbarThin } from './metrics'

export const ViewHolder = styled.div`
  width: 100%;
  height: 1px;
`

type TBar = {
  width?: string
  height: string
  $barSize?: string
  $showOnHover?: boolean
  withBorder?: boolean
  $shadowSize: string
}
// export const Wrapper = styled(WrapperBase)<TBar>`
export const Wrapper = styled.div<TBar>`
  position: relative;
  border: 1px solid blue;

  .os-host:not(:hover) {
    visibility: ${({ $showOnHover }) => ($showOnHover ? 'hidden' : 'inherit')};
  }

  .os-theme-dark > .os-scrollbar-vertical,
  .os-theme-light > .os-scrollbar-vertical {
    width: ${({ $barSize }) => `${getScrollbarThin($barSize, 'vertical')} !important`};
  }
`
export const ScrollWrapper = styled(ScrollWrapperBase)``
const ShadowBar = styled(ShadowBarBase)<TBar>`
  left: 0px;
  height: ${({ $shadowSize }) => getShadowSize($shadowSize)};
  width: 100%;
  background: ${({ $shadowSize }) => getShadowBackground($shadowSize, 'vertical')};
  border-top: ${({ withBorder }) => (withBorder ? '1px solid' : 'none')};
  border-color: ${({ withBorder }) => (withBorder ? '#084255' : 'none')};
`
export const TopShadowBar = styled(ShadowBar)`
  top: 0;
  z-index: 2;
`
export const BottomShadowBar = styled(ShadowBar)`
  bottom: 0;
  transform: rotate(180deg);
`
