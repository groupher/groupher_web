import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'

import Img from '@/Img'

export { HeaderBaseInfo, BaseInfo, FloorNum } from '.'

type TAvatar = { avatarSize: number; avatarLayout: TAvatarLayout }

export const Wrapper = styled.div`
  ${css.row('align-center')};
  position: relative;
  width: 100%;
`
export const CurveLine = styled.div`
  position: absolute;
  left: -32px;
  top: -25px;
  ${css.size(45)};
  border-radius: 22px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('comment.indentLine')};
  transform: rotate(20deg);
  z-index: -1;

  &:after {
    content: '';
    ${css.circle(20)};
    background: ${theme('alphaBg2')};
    position: absolute;
    bottom: -3px;
    right: 7px;
  }
`
export const Avatar = styled(Img)<TAvatar>`
  ${({ avatarSize }) => css.size(avatarSize)};
  opacity: ${theme('avatar.opacity')};
  margin-right: 13px;
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};
  ${css.media.mobile`
    margin-right: 5px;
  `}
`
export const UserBase = styled.div`
  ${css.row('align-center')};
  font-size: 15px;
  flex-grow: 1;
`
export const Nickname = styled.div`
  color: ${theme('article.title')};
  font-size: 15px;
  ${css.cutRest('150px')};

  ${css.media.mobile`
    ${css.cutRest('80px')};
  `}
`
export const AuthorTag = styled.div`
  font-size: 11px;
  margin-bottom: 2px;
  padding: 1px 8px;
  /* padding-top: 2px; */
  margin-left: 7px;
  background-color: #fff6dd;
  color: #ff9800;
  border: 1px solid;
  border-color: #ff9800;
  border-radius: 8px;
  font-weight: 600;

  ${css.media.mobile`
    margin-left: 5px;
    padding: 0 4px;
  `}
`
export const RefToOther = styled.div`
  ${css.row('align-center')};
  color: ${theme('comment.username')};
  margin-left: 8px;
`
export const RefLabel = styled.div`
  font-size: 12px;
  margin-top: 3px;
  opacity: 0.8;
  &:after {
    content: ': ';
  }
`
export const RefUser = styled.div`
  font-size: 15px;
  margin-left: 8px;
  ${css.cutRest('100px')};
`
export const ShortIntro = styled.div`
  color: ${theme('comment.floor')};
  ${css.cutRest('280px')};
  font-size: 13px;
  opacity: 0.8;
  margin-top: 1px;

  ${css.media.mobile`
    ${css.cutRest('200px')};
  `};
`
export const CreateDate = styled.div`
  ${css.row('align-center')};
  color: ${theme('comment.floor')};
  font-size: 12px;
  margin-left: 2px;

  ${css.media.mobile`
    font-size: 11px;
  `};
`
