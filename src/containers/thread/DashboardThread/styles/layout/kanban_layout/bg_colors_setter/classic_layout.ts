import type { TActive, TColor } from '~/spec'

import styled, { css, theme, rainbowSoft } from '~/css'

export const BoardsWrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 16px;
  width: 100%;
  margin-top: 26px;

  ${css.media.mobile`
    display: none;
  `}
`
type TBoard = TColor & TActive
export const Board = styled.div<TBoard>`
  ${css.column()};
  padding: 8px;
  gap: 6px;
  overflow: hidden;

  width: 220px;
  height: 280px;
  background-color: ${({ $color }) => rainbowSoft($color)};

  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('lightText') : 'transparent')};

  ${css.media.mobile`
    width: 50%;
  `}
  transition: all 0.2s;
`
