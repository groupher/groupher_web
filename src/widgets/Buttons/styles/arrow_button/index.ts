import type { TSpace } from '~/spec'

import styled, { css, rainbowLink } from '~/css'

import type { TProps } from '../../ArrowButton'

type TWrapper = Pick<TProps, 'disabled' | 'color' | 'fontSize'> & {
  width: number
  $reverseColor: boolean
  $dimWhenIdle: boolean
} & TSpace

export const Wrapper = styled.button<TWrapper>`
  position: relative;
  ${css.row('align-center')};
  display: inline-flex;
  opacity: ${({ $dimWhenIdle, disabled }) => ($dimWhenIdle || disabled ? '0.65' : 1)};
  color: ${({ color, $reverseColor }) => {
    if ($reverseColor) return 'white'

    return rainbowLink(color)
  }};

  border: none;
  background: transparent;
  vertical-align: middle;
  font-weight: 500;

  gap: 0 0.6em;

  ${(props) => css.spaceMargins(props)};

  width: ${({ width }) => `${width + 25}px`};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.65 : 0.8)};
  }

  transition: all 0.2s;
`
export const Text = styled.div<{ fontSize: number }>`
  word-break: keep-all;
  white-space: nowrap;
  line-height: 15px;
  font-size: ${({ fontSize }) => `${fontSize}px`};
`
