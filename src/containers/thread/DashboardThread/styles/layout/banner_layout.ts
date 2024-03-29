import type { TActive } from '@/spec'

import styled, { css, theme } from '@/css'

import { Divider } from '@/widgets/Common'
import { BaseSection, BlockBase } from '.'

export { Bar, Circle } from '.'

export const Wrapper = styled(BaseSection)``
export const CommunityTitle = styled.div`
  font-weight: 600;
  color: ${theme('article.title')};
  font-size: 12px;
  ${css.cutRest('50px')};
`
export const SelectWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 30px;
  width: calc(100% + 40px);

  ${css.media.mobile`
    width: 100%;
  `}
`
export const Main = styled.div`
  ${css.row()};
  width: 100%%;
`
export const ListsWrapper = styled.div<{ noBorder?: boolean }>`
  border-right: ${({ noBorder }) => (noBorder ? 'none' : '1px solid')};
  border-right-color: ${theme('divider')};
  width: 85%;
`
export const TagsWrapper = styled.div`
  width: 15%;
  margin-left: 20px;
`
export const SidebarWrapper = styled.div`
  width: 80px;
  padding-right: 15px;
  border-right: 1px solid;
  border-right-color: ${theme('divider')};
  z-index: 2;
  margin-top: -6px;
`
export const ExampleBtn = styled.div`
  display: inline-block;
`
export const Layout = styled.div`
  ${css.column('align-both')};
`
export const LayoutTitle = styled.div<TActive>`
  opacity: ${({ $active }) => ($active ? 1 : 0.65)};

  ${Layout}:hover & {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const Block = styled(BlockBase)`
  width: 300px;
  height: 200px;
  padding: 12px 25px;
`
export const DividerLine = styled(Divider)`
  opacity: 0.8;
`
