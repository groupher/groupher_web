import type { TActive, TSpace } from '~/spec'
import styled, { css, theme } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

type TProps = { menuOpen?: boolean; selected?: boolean } & TSpace

export default ({ menuOpen, selected, ...spacing }: TProps) => {
  const { cn, fg, bg, margin } = useTwBelt()

  return {
    wrapper: cn(
      'row-center rounded-lg h-8 py-0.5 transition-colors',
      `hover:${bg('hoverBg')}`,
      selected && 'mx-1',
      fg('text.digest'),
      (menuOpen || selected) && bg('hoverBg'),
      margin(spacing),
    ),
    //
  }
}

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
