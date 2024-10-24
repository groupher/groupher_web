import Link from 'next/link'

import Img from '~/Img'
import styled, { css, theme } from '~/css'

// import { Wrapper as CommentBlock } from '../desktop_view'

export { HeaderBaseInfo, BaseInfo, FloorNum } from '.'

export const Avatar = styled(Img)<{ avatarSize: number }>`
  ${({ avatarSize }) => css.circle(avatarSize)};
  margin-right: 13px;
`
export const ArticleBase = styled.div`
  ${css.row('align-center')};
  flex-grow: 1;
`
export const AuthorTitle = styled(Link)`
  color: ${theme('article.title')};
  text-decoration: none;
  font-size: 15px;
  ${css.cutRest('300px')};

  &:hover {
    color: ${theme('article.title')};
    text-decoration: underline;
  }

  ${css.media.mobile`
    ${css.cutRest('260px')};
  `};
`
export const AuthorName = styled(Link)`
  color: ${theme('article.digest')};
  font-size: 13px;
  text-decoration: none;
  margin-top: 2px;
  margin-bottom: 2px;

  &:hover {
    color: ${theme('article.digest')};
    text-decoration: underline;
  }
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
  opacity: 0.8;
  margin-top: 5px;
`
