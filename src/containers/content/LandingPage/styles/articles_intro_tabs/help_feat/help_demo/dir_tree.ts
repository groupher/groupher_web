import styled from 'styled-components'

import css, { theme } from '@/css'

import GithubSVG from '@/icons/Github8'
import BookSVG from '@/icons/Book'

export const Wrapper = styled.div`
  background: ${theme('htmlBg')};
  margin-top: 40px;
  width: 170px;
  height: 398px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 6px;
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;
  padding: 15px 18px;
`
export const DirName = styled.div<{ opacity?: number }>`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 4px;
  opacity: ${({ opacity }) => opacity};
`
export const File = styled.div<{ opacity?: number }>`
  color: ${theme('article.digest')};
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 3px;
  margin-left: 4px;
  opacity: ${({ opacity }) => opacity || 0.8};
`
export const BookIcon = styled(BookSVG)`
  ${css.size(13)};
  margin-top: -1px;
  margin-left: -1px;
  fill: ${theme('article.digest')};
  margin-right: 3px;
`
export const GithubIcon = styled(GithubSVG)`
  ${css.size(11)};
  margin-top: -1px;
  margin-left: 1px;
  fill: ${theme('article.digest')};
  margin-right: 4px;
`
export const PinnedItem = styled.div`
  ${css.row('align-center')};
  margin-bottom: 3px;
`
