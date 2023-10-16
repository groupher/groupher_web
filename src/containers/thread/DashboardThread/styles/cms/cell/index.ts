import styled from 'styled-components'
import Link from 'next/link'

import css, { theme } from '@/css'

import Img from '@/Img'

import PulseSVG from '@/icons/Pulse'
import PublishSVG from '@/icons/EditPen'

import Button from '@/widgets/Buttons/Button'

export const ArticleWrapper = styled.div``

export const CommunityLogo = styled(Img)`
  ${css.size(24)};
  margin-right: 10px;
  margin-top: -5px;
`
export const CommunityTitle = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 500;
`
export const ActionCell = styled.div`
  ${css.column('align-center')};
`
export const SwitchButton = styled(Button)`
  margin-top: 2px;
  padding: 2px 7px;
  padding-bottom: 1px;
  opacity: 0;

  ${ActionCell}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Pending = styled.div<{ blocked?: boolean }>`
  color: ${({ blocked }) => (blocked ? theme('rainbow.red') : theme('article.digest'))};
  font-weight: bold;
  font-size: 12px;
  margin-top: 2px;
`
export const CommunitySlug = styled(Link)`
  font-size: 14px;
  color: ${theme('article.digest')};
  text-decoration: none;
  display: block;
  margin-top: -2px;

  &:hover {
    text-decoration: underline;
    color: ${theme('link')};
  }
`
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
  ${css.column('align-end')};
  gap: 3px 0;
  margin-top: 1px;
`
export const DateItem = styled.div<{ warn?: boolean }>`
  ${css.row('align-center')};
  color: ${({ warn }) => (warn ? theme('rainbow.red') : theme('article.digest'))};
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
  ${css.column('align-end')};
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
