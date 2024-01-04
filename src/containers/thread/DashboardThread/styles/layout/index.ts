import styled, { css, theme, rainbow } from '@/css'

import type { TActive, TColor, TColorName } from '@/spec'

export const Wrapper = styled.div`
  ${css.column()};
  padding-left: 56px;
  width: 700px;

  ${css.media.mobile`
    padding: 20px;
  `};
`
export const Banner = styled.div`
  height: 70px;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 40px;
  position: relative;

  ${css.media.mobile`
    margin-bottom: 25px;
  `};
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -8px;

  ${css.media.mobile`
    width: 100%;
    overflow: scroll;
  `};
`
export const BaseSection = styled.section`
  padding-bottom: 30px;
`
export const TitleBase = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  margin-bottom: 12px;
`

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
