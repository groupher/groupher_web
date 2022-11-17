import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import LinkSVG from '@/icons/Link'

export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-right: 5px;
  margin-top: 2px;
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
`
export const Source = styled.a<{ plainColor: boolean }>`
  color: ${({ plainColor }) =>
    plainColor ? theme('article.digest') : theme('link')};
  font-size: 13px;
  margin-left: 3px;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    color: ${theme('linkHover')};
    text-decoration: underline;
  }
`
export const PopHint = styled.div`
  font-size: 12px;
  padding: 4px 10px;
  color: ${theme('article.title')};
`
