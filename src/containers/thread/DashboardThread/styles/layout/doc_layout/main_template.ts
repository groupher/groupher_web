import type { TColorName } from '@/spec'

import styled, { css, theme, rainbow, rainbowLight } from '@/css'

import ToolSVG from '@/icons/Heart'

export { Bar, Circle } from '..'

export const CardssLayoutWrapper = styled.div`
  ${css.rowWrap()};
  gap: 10px;
  width: 100%;
`
export const FooterMore = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10%;
  ${css.row('align-both')};
  background: ${theme('hoverBg')};
  border-radius: 3px;
  height: 10px;
  width: 80%;
`
export const BlocksLayoutWrapper = styled.div<{ withDivider?: boolean }>`
  ${css.rowWrap()};
  gap: 22px 0;
  border-right: ${({ withDivider }) => (withDivider ? '1px solid' : 'none')};
  border-right-color: ${theme('divider')};
  width: 100%;
`
export const ListsLayoutWrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  margin-left: 30px;
`
export const Box = styled.div`
  width: 100%;
`
export const Box3 = styled.div`
  width: 33.3%;
`
export const BorderBox3 = styled.div`
  position: relative;
  width: 30%;
  border: 1px solid;
  border-color: ${theme('divider')};
  padding: 10px;
`
export const IconWrapper = styled.div<{ color: TColorName }>`
  ${css.size(15)};
  ${css.row('align-both')};
  border-radius: 2px;
  background-color: ${({ color }) => rainbowLight(color)};
  margin-bottom: 8px;
  margin-right: 20px;
`
export const ToolIcon = styled(ToolSVG)<{ color: TColorName }>`
  ${css.size(8)};
  fill: ${({ color }) => rainbow(color)};
`

export const ListContent = styled.div`
  width: 120px;
`
