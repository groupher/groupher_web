import styled from 'styled-components'

import type { TColor } from '@/spec'

import UpvoteSVG from '@/icons/Upvote'
import NIGHT_THEMES from '@/utils/themes/skins/night'

import css from '@/css'
import { BaseCard } from './panel'

export { Footer } from './panel'

export const Wrapper = styled(BaseCard)`
  background: ${NIGHT_THEMES.htmlBg};
`
export const Item = styled.div`
  ${css.row('align-center')};
  gap: 6px;
  margin-bottom: 7px;
`
export const NightTitle = styled.div`
  color: ${NIGHT_THEMES.article.title};
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const NightCodeBox = styled.div`
  width: 100%;
  min-height: 54px;
  padding: 8px 3px;
  padding-bottom: 0;
  background: ${NIGHT_THEMES.hoverBg};
  border-radius: 5px;
`
type TBar = { width: number } & { opacity?: number } & TColor
export const NightBar = styled.div<TBar>`
  height: 4px;
  width: ${({ width }) => `${width || 30}px`};
  background: ${({ $color }) => NIGHT_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
  border-radius: 5px;
  opacity: ${({ opacity }) => opacity || 0.4};
`
export const NightUpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  fill: ${NIGHT_THEMES.article.digest};
`
export const NightCount = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${NIGHT_THEMES.article.title};
  margin-left: 2px;
`
