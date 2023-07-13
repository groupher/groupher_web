import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/utils/css'
import PostSVG from '@/icons/EditPen'
import CommentSVG from '@/icons/Comment'
import UserSVG from '@/icons/Users'
import EmojiSVG from '@/icons/Heart'
import PulseSVG from '@/icons/Pulse'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex()};
  width: calc(100% + 38px);
  margin-top: 30px;
  margin-bottom: 22px;

  ${css.media.mobile`
    width: 100%;
    flex-wrap: wrap;
    gap: 50px 0;
  `};
`
export const Block = styled.div`
  ${css.flexColumn('align-start')};
  width: 20%;
  height: 100px;

  ${css.media.mobile`
    width: 33%;
  `};
`
const IconWrapper = styled.div`
  ${css.circle(28)};
  ${css.flex('align-both')};
  margin-bottom: 12px;
  margin-left: -2px;
`
export const UsersWrapper = styled(IconWrapper)`
  background: ${theme('baseColor.blueBg')};
`
export const ContentWrapper = styled(IconWrapper)`
  background: ${theme('baseColor.purpleBg')};
`
export const CommentsWrapper = styled(IconWrapper)`
  background: ${theme('baseColor.orangeBg')};
`
export const EmojisWrapper = styled(IconWrapper)`
  background: ${theme('baseColor.redBg')};
`
export const TrendWrapper = styled(IconWrapper)`
  background: ${theme('baseColor.greenBg')};
`
export const UsersIcon = styled(UserSVG)`
  ${css.size(14)};
  fill: ${theme('baseColor.blue')};
  opacity: 0.8;
  filter: drop-shadow(0 0px 5px #a9c0e2);
`
export const ContentIcon = styled(PostSVG)`
  ${css.size(12)};
  fill: ${theme('baseColor.purple')};
  filter: drop-shadow(0 0px 5px #bea3cc);
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(12)};
  fill: ${theme('baseColor.orange')};
  margin-left: 1px;
  margin-top: 1px;
  opacity: 0.8;
  filter: saturate(1.3) drop-shadow(0 0px 5px #d9a590);
`
export const EmojiIcon = styled(EmojiSVG)`
  ${css.size(14)};
  fill: ${theme('baseColor.red')};
  filter: saturate(1.3) drop-shadow(0 0px 5px #e8a7a0);
`
export const TrendIcon = styled(PulseSVG)`
  ${css.size(14)};
  fill: ${theme('baseColor.green')};
  filter: drop-shadow(0 0px 5px #d0e3b8);
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 2px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 10px;
  opacity: 0.8;
`
export const Num = styled.div`
  color: ${theme('article.title')};
  font-size: 20px;
  font-weight: 400;
  margin-top: 5px;
`
export const TrendLineWrapper = styled.div`
  margin-top: 6px;
  margin-left: -5px;
  width: 100%;
`
