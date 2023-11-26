import styled from 'styled-components'

import type { TActive, TAvatarLayout, TTestable } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'
import Img from '@/Img'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  min-width: 200px;
  max-width: 200px;
  padding-top: 15px;

  ${css.media.tablet`display: none;`};
  ${css.media.mobile`display: none;`};
`
export const StickyWrapper = styled.div`
  ${css.column()};
`
export const DividerTitle = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 500;
`
export const CommunityJoinersWrapper = styled.div<TActive>`
  ${css.row()};
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  margin-bottom: ${({ $show }) => ($show ? '15px' : 0)};
  height: ${({ $show }) => ($show ? 'auto' : 0)};
  margin-bottom: 25px;
`
export const MoreNum = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  margin-top: 1px;
  margin-left: 4px;
  letter-spacing: 1px;
  opacity: 0.8;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('hoverBg')};
    opacity: 1;
    cursor: pointer;
  }
`
export const JoinerAvatar = styled(Img)<{ $avatarLayout: TAvatarLayout }>`
  ${css.size(24)};
  border-radius: ${({ $avatarLayout }) =>
    $avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%'};
  margin-right: 8px;
`
export const CommunityNoteWrapper = styled.div`
  ${css.lineClamp(2)}
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 18px;
  line-height: 1.6;
`
export const PublishWrapper = styled.div<TActive>`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  width: 100%;
  margin-left: 3px;
`
export const NoteWrapper = styled.div`
  color: ${theme('hint')};
  font-size: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  border-bottom-color: #003b49;
`
export const TagsBarWrapper = styled.div`
  margin-top: 25px;
  max-width: 186px;
`
