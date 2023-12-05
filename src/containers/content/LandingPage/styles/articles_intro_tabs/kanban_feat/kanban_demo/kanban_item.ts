import styled from 'styled-components'

import UpvoteSVG from '@/icons/Upvote'

import css, { theme } from '@/css'

export const Wrapper = styled.div<{ opacity: number }>`
  ${css.column('justify-between')};
  background: ${theme('htmlBg')};
  border-radius: 6px;
  min-height: 62px;
  padding: 8px 6px;
  opacity: ${({ opacity }) => opacity};
`
export const Title = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  font-weight: 500;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  width: calc(100% + 20px);
  margin-left: -9px;
  transform: scale(0.9);
  opacity: 0.8;
  margin-top: 8px;
`
export const UpvoteIcon = styled(UpvoteSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  margin-top: 1px;
`

export const Count = styled.div`
  font-size: 13px;
  color: ${theme('article.title')};
  margin-left: 4px;
  flex-grow: 1;
`
