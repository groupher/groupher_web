import UpvoteSVG from '@/icons/Upvote'
import DAY_THEMES from '@/utils/themes/skins/day'
import NIGHT_THEMES from '@/utils/themes/skins/night'

import styled, { css } from '@/css'
import { BaseCard, BaseBar, BaseCount, BaseCodeBox } from './panel'

export { Footer, CodeItem } from './panel'

export const Wrapper = styled(BaseCard)<{ $hovering: boolean }>`
  background: ${({ $hovering }) => (!$hovering ? NIGHT_THEMES.htmlBg : DAY_THEMES.htmlBg)};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-top: ${({ $hovering }) => ($hovering ? '16px' : '0')};
`
export const Title = styled.div<{ $hovering: boolean }>`
  color: ${({ $hovering }) => (!$hovering ? NIGHT_THEMES.article.title : DAY_THEMES.article.title)};
  font-size: 11px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const CodeBox = styled(BaseCodeBox)<{ $hovering: boolean }>`
  background: ${({ $hovering }) => (!$hovering ? NIGHT_THEMES.hoverBg : DAY_THEMES.hoverBg)};
  transition: all 0.3s;
`
export const Bar = styled(BaseBar)`
  background: ${({ $color }) => NIGHT_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
`
export const UpvoteIcon = styled(UpvoteSVG)<{ $hovering: boolean }>`
  ${css.size(12)};
  fill: ${({ $hovering }) => (!$hovering ? NIGHT_THEMES.article.title : DAY_THEMES.article.title)};
`
export const Count = styled(BaseCount)<{ $hovering: boolean }>`
  color: ${({ $hovering }) => (!$hovering ? NIGHT_THEMES.article.title : DAY_THEMES.article.title)};
`
