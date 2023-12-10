import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'
import NIGHT_THEMES from '@/utils/themes/skins/night'

import css from '@/css'
import { BaseCard, BaseBar, BaseCount, BaseCodeBox } from './panel'

export { Footer, CodeItem } from './panel'

export const Wrapper = styled(BaseCard)`
  background: ${NIGHT_THEMES.htmlBg};
`
export const Title = styled.div`
  color: ${NIGHT_THEMES.article.title};
  font-size: 12px;
  margin-bottom: 6px;
  font-weight: 450;
`
export const CodeBox = styled(BaseCodeBox)`
  background: ${NIGHT_THEMES.hoverBg};
`
export const Bar = styled(BaseBar)`
  background: ${({ $color }) => NIGHT_THEMES.rainbow[`${$color?.toLowerCase() || 'black'}`]};
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(12)};
  fill: ${NIGHT_THEMES.article.digest};
`
export const Count = styled(BaseCount)`
  color: ${NIGHT_THEMES.article.title};
`
