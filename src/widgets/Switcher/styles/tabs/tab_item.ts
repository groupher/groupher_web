import type { TSizeSM, TActive, TColor } from '~/spec'
import styled, { css, theme, rainbow } from '~/css'

import { getMarginRight, getPadding, getMarginBottom } from '../metric/tabs'

type TTab = {
  size: TSizeSM
  $mobileView: boolean
  $wrapMode: boolean
  $modelineView: boolean
} & TActive

export const Wrapper = styled.div<TTab>`
  ${css.row('justify-center')};
  color: ${theme('article.title')};
  position: relative;
  height: 100%;
  z-index: 1;
  margin-right: ${({ size, $mobileView }) => getMarginRight(size, $mobileView)};
  padding: ${({ size, $mobileView, $wrapMode, $modelineView }) =>
    getPadding(size, $mobileView, $wrapMode, $modelineView)};
  text-align: center;
  min-width: auto;

  margin-bottom: ${({ $wrapMode }) => getMarginBottom($wrapMode)};

  /* background: ${({ active }) => (active ? '#114758' : '')}; */

  ${css.media.mobile`
    margin-right: ${() => getMarginRight('', true)};
  `};

  &:hover {
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const ActiveLineWrapper = styled.div`
  position: absolute;
  bottom: 0;
  ${css.row('align-center')};
  width: 100%;
`
export const ActiveLine = styled.div`
  width: calc(100% - 20px);
  margin-left: 10px;
  border-bottom: 3px solid;
  border-bottom-color: ${theme('tabs.headerActive')};
  border-radius: 3px;
`
export const Nav = styled.nav`
  position: relative;
  ${css.row('align-center')};
  flex-flow: row wrap;
  margin: 0 auto;
  padding: 0;
`

type TLabel = TActive & {
  size: TSizeSM
  $bottomSpace: number
} & TColor

export const Label = styled.span<TLabel>`
  ${css.row('align-center')};
  white-space: nowrap;
  padding: 1px 6px;
  border-radius: 3px;
  color: ${({ $active, $color }) =>
    $active ? rainbow($color, 'dashboard.menuCat') : theme('lightText')}; // to-theme
  margin-bottom: ${({ $bottomSpace }) => `${$bottomSpace}px`};
  font-weight: 500;

  &:hover {
    color: ${({ $color }) => rainbow($color, 'article.title')};
    background: ${theme('hoverBg')};
  }

  transition: all .2s;
`
