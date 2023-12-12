// import Img from '@/Img'
import UserBadge from '@/icons/UserBadge'
import CheckSVG from '@/icons/CheckBold'

import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  margin-bottom: 5px;
  margin-top: -12px;
  margin-left: -8px;

  ${css.media.mobile`
    margin-left: -8px;
  `};
`

export const MainWrapper = styled.div`
  ${css.row('align-center')};

  ${css.media.mobile`
    flex-wrap: wrap;
    gap: 10px 0; 
  `};
`

export const ExtraWrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 14px;
  padding: 0 8px;
`
export const AnwserWrapper = styled.span`
  ${css.row('align-center')};
  font-size: 12px;
  color: ${theme('rainbow.green')};
  font-weight: 600;
  margin-right: 15px;
  text-shadow: #8bc34a2e 1px 0 8px;
`
export const CheckSVGIcon = styled(CheckSVG)`
  ${css.size(13)};
  fill: ${theme('rainbow.green')};
  margin-right: 5px;
  margin-top: -1px;
  opacity: 0.6;
`
export const AuthorUpvoteWrapper = styled.span`
  ${css.row('align-center')};
  font-size: 11px;
  color: ${theme('article.info')};
  opacity: 0.8;
`
export const UpvotedIcon = styled(UserBadge)`
  ${css.size(12)};
  fill: ${theme('article.info')};
  margin-right: 5px;
  margin-top: -1px;
  opacity: 0.6;
`
