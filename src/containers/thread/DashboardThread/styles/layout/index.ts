import styled, { css, theme, rainbow } from '~/css'

import type { TActive, TColor, TColorName } from '~/spec'

import useTwBelt from '~/hooks/useTwBelt'
import useTheme from '~/hooks/useTheme'

export default () => {
  const { cn, br, bg, shadow, primary, sexyHBorder, enhanceDark, isBlackPrimary } = useTwBelt()
  const { isLightTheme } = useTheme()

  return {
    wrapper: 'column pl-16 w-10/12',
    banner: cn('relative h-16 w-full border-b mb-10', br('divider')),
    tabs: 'absolute -left-2 bottom-0',
    //
    baseSection: 'pb-7',
    blockBase: cn(
      'relative border w-72 rounded-md px-4 py-4 border pointer saturate-0',
      isLightTheme ? 'opacity-65' : 'opacity-50',
      'hover:opacity-100 trans-all-200',
      br('text.hint'),
    ),
    blockBaseActive: cn(
      'opacity-100 saturate-100',
      primary('border'),
      isBlackPrimary && br('text.link'),
      shadow('md'),
    ),
    divider: sexyHBorder(35, 'mt-5 mb-12'),

    // basic shape
    bar: cn(
      'absolute h-1.5 w-20 opacity-40 rounded',
      primary('bg'),
      isBlackPrimary && bg('text.link'),
      enhanceDark(),
    ),
    circle: cn(
      'absolute size-2 circle opacity-40',
      primary('bg'),
      isBlackPrimary && bg('text.link'),
      enhanceDark(),
    ),
  }
}

type TBlockBase = TActive & TColor
export const BlockBase = styled.div<TBlockBase>`
  position: relative;
  opacity: ${({ $active }) => ($active ? 1 : theme('dashboardBlockOpacity'))};
  box-shadow: ${({ $active }) => ($active ? css.cardShadow : '')};
  background-color: ${({ $active }) => ($active ? theme('dashboard.blockActiveBg') : 'transparent')};

  border: 1px solid;
  border-radius: 7px;
  border-color: ${({ $active, $color }) =>
    $active ? rainbow($color, 'article.digest') : theme('button.upvoteBorder')};
  padding: 16px 15px;

  &:hover {
    opacity: ${({ $active }) => ($active ? 0.85 : 0.65)};
    border-color: ${({ $color }) => rainbow($color, 'article.digest')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const BaseSection = styled.section`
  padding-bottom: 30px;
`

export const TitleBase = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 12px;
`

// base shapes
type TBar = { long: number; thin?: boolean; bold?: boolean; $color?: TColorName }
export const Bar = styled.div<TBar>`
  width: ${({ long }) => `${long || 10}%`};
  height: ${({ thin }) => (thin ? '4px' : '10px;')};
  background: ${({ thin, bold, $color }) => {
    if ($color) return rainbow($color, 'article.title')

    // if (bold) return theme('article.title')
    // return thin ? theme('article.digest') : theme('primary')

    return theme('article.digest')
  }};
  z-index: 3;
  border-radius: 5px;
  opacity: ${({ thin, bold }) => {
    if (bold) return 0.6

    return 0.5
  }};
`

export const Circle = styled.div<{ radius?: number }>`
  ${({ radius }) => `${css.circle(radius || 22)}`};
  background: ${theme('article.title')};
`
