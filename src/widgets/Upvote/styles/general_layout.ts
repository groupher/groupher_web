import styled from 'styled-components'

import type { TTestable, TActive, TColorName } from '@/spec'
import css, { rainbowLight, rainbowLink, theme } from '@/css'

import { LineDivider as LineDividerBase } from '@/widgets/Common'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.row('align-center')};
`
type TButton = TActive & { color: TColorName }
export const Button = styled.div<TButton>`
  ${css.row('align-center')};
  border: ${({ $active }) => ($active ? '1px dotted' : '1px solid')};
  height: 22px;

  margin-left: ${({ $active }) => ($active ? 0 : '-8px')};
  border-color: ${({ $active, color }) =>
    $active ? rainbowLink(color, 'blackActive') : 'transparent'};

  background-color: ${({ $active, color }) => ($active ? rainbowLight(color) : 'transparent')};

  border-radius: 6px;
  padding: 0 8px;

  &:hover {
    margin-left: 0;
    border: 1px solid;
    border-color: ${({ color }) => rainbowLink(color, 'blackActive')};
    background-color: ${({ color }) => rainbowLight(color)};
    cursor: pointer;
  }

  transition: 0.2s all;
`
export const UpvoteBtnWrapper = styled.div`
  ${css.row('align-both')};
  margin-top: 1px;
  transform: scale(0.8);
`
export const DescWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 2px;
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 12px;
  margin-top: 1px;
`
export const Count = styled.div<{ noOne: boolean }>`
  color: ${theme('article.info')};
  font-weight: ${({ noOne }) => (noOne ? 400 : 600)};
`
export const LineDivider = styled(LineDividerBase)`
  height: 10px;
  background: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 12px;
  margin-right: 10px;
  margin-top: 1px;
`
