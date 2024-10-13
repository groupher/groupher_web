import type { TColor } from '~/spec'
import styled, { css, theme } from '~/css'

import { COLOR_NAME } from '~/const/colors'

import { WithMargin } from '~/widgets/Common'

import useTwBelt from '~/hooks/useTwBelt'

export { cn } from '~/css'

export default () => {
  const { cn, bg, br, fill, rainbow, shadow } = useTwBelt()

  return {
    wrapper: cn('align-both w-full h-72 relative mt-3'),
    divideColumn: cn(
      'absolute left-30 top-3 w-1 h-40 rounded-md z-10 opacity-65 trans-all-200',
      rainbow(COLOR_NAME.RED, 'bg'),
    ),
    //
    switchBox: cn(
      'absolute row-center-between px-1 w-16 h-7 z-20 rounded-lg border scale-90 trans-all-200',
      br('divider'),
      bg('alphaBg'),
      shadow('xl'),
    ),
    themeBox: cn('align-both size-6 border border-transparent rounded-md trans-all-200'),
    boxSolid: cn(br('divider'), rainbow(COLOR_NAME.CYAN, 'bg'), 'opacity-80'),
    icon: cn('size-4', fill('text.title')),
    iconSolid: fill('button.fg'),

    //
    cardFooter: 'row-center mt-1 w-full',
    card: cn('column w-28 h-32 p-2.5 rounded-lg border trans-all-200', shadow('sm'), br('divider')),
    lightBg: 'bg-htmlBg',
    darkBg: 'bg-htmlBg-dark',
    lightText: 'text-text-title',
    darkText: 'text-text-title-dark',

    lightFill: 'fill-text-title',
    darkFill: 'fill-text-title-dark',

    lightBox: 'bg-hoverBg',
    darkBox: 'bg-hoverBg-dark',
  }
}

export const Footer = styled(WithMargin)`
  ${css.row('align-center')};
  opacity: 0.8;
`

type TBaseCard = {
  $width?: number
  $height?: number
}
export const BaseCard = styled.div<TBaseCard>`
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  opacity: 0.8;

  transition: all 0.3s;
`
type TBar = { width: number } & { opacity?: number } & TColor
export const BaseBar = styled.div<TBar>`
  height: 4px;
  width: ${({ width }) => `${width || 30}px`};
  border-radius: 5px;
  opacity: ${({ opacity }) => opacity || 0.4};
`
export const BaseCodeBox = styled.div`
  width: 100%;
  min-height: 54px;
  padding: 8px 3px;
  padding-bottom: 0;
  border-radius: 5px;
`
export const BaseCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  margin-left: 2px;
`
export const CodeItem = styled.div`
  ${css.row('align-center')};
  gap: 6px;
  margin-bottom: 7px;
`
