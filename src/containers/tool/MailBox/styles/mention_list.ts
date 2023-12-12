import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  overflow: hidden;
`
export const ListsWrapper = styled.div`
  width: 340px;
`
export const UserLabel = styled.div`
  ${css.row('align-center')};

  &:hover {
    cursor: pointer;
  }
`
export const UserAvatar = styled(Img)`
  ${css.circle(16)};
  margin-right: 3px;
`
export const UserNickname = styled.div`
  color: ${theme('article.digest')};
  margin-top: -2px;
  ${UserLabel}:hover & {
    color: ${theme('banner.title')};
  }
`

export const MessageLinker = styled.a`
  color: ${theme('article.title')};
  margin-top: 5px;
  &:hover {
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`

export const Message = styled.div`
  ${css.column()};
  padding: 6px 5px;
  &:hover {
    background: #113744;
  }
`
export const MessageDivider = styled.div`
  border-bottom: 1px solid;
  border-bottom-color: ${theme('banner.desc')};
  width: 100%;
  opacity: 0.3;
`
export const MessageHeader = styled.div`
  ${css.row()};
`
export const MessageBody = styled.div``
export const TitleHeader = styled.div`
  ${css.row('align-center')};
`
export const TypeLabel = styled.div`
  color: ${theme('article.digest')};
  background: ${theme('mailBox.headHightBg')};
  font-size: 0.85rem;
  margin-right: 3px;
`
export const SourceTitle = styled.div`
  color: ${theme('article.title')};
  ${css.cutRest('180px')};
  font-size: 0.9rem;
  &:hover {
    cursor: pointer;
  }
`
export const SourcePreview = styled.div`
  ${css.row()};
  color: ${theme('article.digest')};
  font-size: 0.8rem;
  margin-top: 3px;
  &:hover {
    cursor: pointer;
  }
`
export const PreviewBody = styled.div`
  font-style: italic;
  ${css.cutRest('250px')};
`
export const AtLabel = styled.span`
  font-style: normal;
`

export const FloorNum = styled.span`
  color: ${theme('comment.floor')};
  margin-right: 2px;
`
