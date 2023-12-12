import type { TActive } from '@/spec'

import styled, { css, theme } from '@/css'
import BrandSVG from '@/icons/Brand'

import { BaseSection, BlockBase } from '.'

export const Wrapper = styled(BaseSection)``
export const SelectWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 42px;
  width: 100%;
`
export const Brand = styled.div`
  ${css.row('align-center')};
`
export const BrandIcon = styled(BrandSVG)`
  fill: ${theme('article.digest')};
  ${css.size(22)};
`
export const BrandTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 600;
`
export const Layout = styled.div`
  ${css.column('align-both')};
`
export const Block = styled(BlockBase)`
  width: 184px;
  height: 80px;
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
