import type { TActive } from '~/spec'
import styled, { css, theme, rainbowLight } from '~/css'
import { WithMargin } from '~/widgets/Common'

type TWrapper = { $menuOpen?: boolean; $selected?: boolean }
export const Wrapper = styled(WithMargin)<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  padding-left: ${({ $selected }) => ($selected ? 0 : '6px')};
  background-color: ${({ $menuOpen, $selected }) =>
    $menuOpen || $selected ? rainbowLight('purple') : 'transparent'};
  margin-left: ${({ $selected }) => ($selected ? '4px' : 0)};
  margin-right: ${({ $selected }) => ($selected ? '4px' : 0)};
  border-radius: 10px;
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
  /* important, otherwise will conflict with bottom */
  z-index: 10;

  &:hover {
    background: ${theme('hoverBg')};
  }
`
export const SelectItem = styled.div<TActive>`
  ${css.row('align-start')};
  padding: 4px 8px;
  width: auto;
  border-radius: 5px;
  background-color: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')}; // to-theme
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: ${theme('hoverBg')};
  }
`
