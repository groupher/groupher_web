import styled from 'styled-components'

import type { TColor } from '@/spec'

import UpvoteSVG from '@/icons/Upvote'
import DAY_THEMES from '@/utils/themes/skins/day'
import css from '@/css'
import { BaseCard } from './panel'

export { Footer } from './panel'

export const Wrapper = styled(BaseCard)`
  background: ${DAY_THEMES.htmlBg};
`
export const Item = styled.div`
  ${css.row('align-center')};
  gap: 6px;
  margin-bottom: 7px;
`
export const DayTitle = styled.div`
  color: ${DAY_THEMES.article.title};
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const DayCodeBox = styled.div`
  width: 100%;
  min-height: 54px;
  padding: 8px 3px;
  padding-bottom: 0;
  background: ${DAY_THEMES.hoverBg};
  border-radius: 5px;
`
type TBar = { width: number } & { opacity?: number } & TColor
export const DayBar = styled.div<TBar>`
  height: 4px;
  width: ${({ width }) => `${width || 30}px`};
  background: ${({ $color }) => DAY_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
  border-radius: 5px;
  opacity: ${({ opacity }) => opacity || 0.4};
`
export const DayUpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  fill: ${DAY_THEMES.article.digest};
`
export const DayCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${DAY_THEMES.article.title};
  margin-left: 2px;
`
