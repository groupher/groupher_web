import type { TActive, TColor } from '~/spec'

import styled, { css, theme, rainbowPale } from '~/css'

export const Wrapper = styled.div`
  ${css.column()};
  gap: 0 16px;
  width: 94%;
  margin-top: 26px;

  ${css.media.mobile`
    display: none;
  `}
`
type TBoard = TColor & TActive
export const Header = styled.div<TBoard>`
  ${css.column()};
  padding: 8px;
  gap: 6px;
  overflow: hidden;

  width: 100%;
  height: 30px;
  background: ${({ $color }) => rainbowPale($color)};
  border-radius: 20px;

  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('lightText') : 'transparent')};

  ${css.media.mobile`
    width: 50%;
  `}
  transition: all 0.2s;
`
export const Content = styled.div<{ $height: string }>`
  padding: 20px 10px;
  width: 100%;
  height: ${({ $height }) => $height};
  position: relative;
`
