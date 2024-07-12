import UpvoteSVG from '~/icons/Upvote'
import LIGHT_THEMES from '~/utils/themes/skins/light'
import DARK_THEMES from '~/utils/themes/skins/dark'

import styled, { css } from '~/css'
import { BaseCard, BaseBar, BaseCount, BaseCodeBox } from './panel'

export { Footer, CodeItem } from './panel'

export const Wrapper = styled(BaseCard)<{ $hovering: boolean }>`
  background: ${({ $hovering }) => (!$hovering ? DARK_THEMES.htmlBg : LIGHT_THEMES.htmlBg)};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-top: ${({ $hovering }) => ($hovering ? '5px' : '0')};
`
export const Title = styled.div<{ $hovering: boolean }>`
  color: ${({ $hovering }) => (!$hovering ? DARK_THEMES.article.title : LIGHT_THEMES.article.title)};
  font-size: 11px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const CodeBox = styled(BaseCodeBox)<{ $hovering: boolean }>`
  background: ${({ $hovering }) => (!$hovering ? DARK_THEMES.hoverBg : LIGHT_THEMES.hoverBg)};
  transition: all 0.3s;
`
export const Bar = styled(BaseBar)`
  background: ${({ $color }) => DARK_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
`
export const UpvoteIcon = styled(UpvoteSVG)<{ $hovering: boolean }>`
  ${css.size(12)};
  fill: ${({ $hovering }) => (!$hovering ? DARK_THEMES.article.title : LIGHT_THEMES.article.title)};
`
export const Count = styled(BaseCount)<{ $hovering: boolean }>`
  color: ${({ $hovering }) => (!$hovering ? DARK_THEMES.article.title : LIGHT_THEMES.article.title)};
`
