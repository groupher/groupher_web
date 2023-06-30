import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Img from '@/Img'

import PulseSVG from '@/icons/Pulse'
import PublishSVG from '@/icons/EditPen'

export const ArticleWrapper = styled.div``

export const ArticleTitle = styled.div`
  color: ${theme('article.title')};
  ${css.cutRest('260px')};
  font-size: 14px;

  &:hover {
    font-weight: 500;
    cursor: pointer;
  }
`
export const StateWrapper = styled.div`
  transform: scale(0.95);
  margin-left: 8px;
  margin-top: 1px;
`
export const DateCellWrapper = styled.div`
  ${css.flexColumn('align-end')};
  gap: 3px 0;
  margin-top: 1px;
`
export const DateItem = styled.div`
  ${css.flex('align-center')};
  font-size: 11px;
`
export const PublishIcon = styled(PublishSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 4px;
`
export const PulseIcon = styled(PulseSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
  margin-right: 5px;
`

export const AuthorWrapper = styled.div`
  ${css.flexColumn('align-end')};
  gap: 3px 0;
`
export const AuthorAvatar = styled(Img)`
  ${css.size(16)};
  border-radius: 2px;
  margin-top: 1px;
`
export const Nickname = styled.div`
  ${css.cutRest('80px')};
  font-size: 11px;
`
