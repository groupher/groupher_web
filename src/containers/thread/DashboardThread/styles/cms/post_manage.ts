import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import UpvoteSVG from '@/icons/Upvote'

export const Wrapper = styled.div`
  // ${css.flexColumn()};
  width: calc(100% + 50px);
  margin-left: -30px;
`

export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(14)};
  transform: scaleY(0.8);
  fill: ${theme('article.title')};
  margin-top: 4px;
  margin-left: 10px;
`
export const Title = styled.span`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 500;
`
