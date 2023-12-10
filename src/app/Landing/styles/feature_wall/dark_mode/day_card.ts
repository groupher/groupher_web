import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'
import DAY_THEMES from '@/utils/themes/skins/day'

import css from '@/css'
import { BaseCard, BaseBar, BaseCount, BaseCodeBox } from './panel'

export { Footer, CodeItem } from './panel'

export const Wrapper = styled(BaseCard)`
  background: ${DAY_THEMES.htmlBg};
`
export const Title = styled.div`
  color: ${DAY_THEMES.article.title};
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const CodeBox = styled(BaseCodeBox)`
  background: ${DAY_THEMES.hoverBg};
`
export const Bar = styled(BaseBar)`
  background: ${({ $color }) => DAY_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  fill: ${DAY_THEMES.article.digest};
`
export const Count = styled(BaseCount)`
  color: ${DAY_THEMES.article.title};
`
