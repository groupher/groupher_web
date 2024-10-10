import type { TColor } from '~/spec'

import styled, { css, rainbow, gradientBg } from '~/css'

import useTwBelt from '~/hooks/useTwBelt'

export default () => {
  const { cn, fg, global } = useTwBelt()

  return {
    wrapper: cn('column-align-both w-full mt-32 mb-16'),
    slogan: 'column align-both mb-16',
    title: cn('text-3xl bold-sm opacity-70', fg('text.title'), global('text-shadow')),
    desc: cn('text-lg mt-3', fg('text.digest')),
    //
    cards: 'align-both w-full h-auto gap-x-9',
    footerCards: 'align-both w-full gap-x-9 mt-9 mb-24',
    leftCards: 'row wrap items-start justify-between gap-y-9 w-[640px]',
  }
}

export const BaseCard = styled.div<TColor>`
  ${css.column('align-center', 'justify-end')};
  width: 300px;
  height: 278px;
  background: ${({ $color }) => gradientBg($color)};
  border: 1px dotted;
  border-color: transparent;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  padding: 0 12px;

  &:hover {
    border-color: ${({ $color }) => rainbow($color)};
  }
  transition: all 0.2s;
`
