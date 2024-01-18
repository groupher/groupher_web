import styled, { css } from '@/css'
import { TActive } from '@/spec'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  margin-top: 140px;
`
export const MainContent = styled.div<TActive>`
  width: 100%;
  position: relative;
  height: ${({ $active }) => ($active ? '100%' : 0)};
  overflow: hidden;
`
export const FeatList = styled.div`
  ${css.column()};
  gap: 18px 0;
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
