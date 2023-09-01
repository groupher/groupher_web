import styled from 'styled-components'

import css, { theme } from '@/css'
import { Wrapper as CommentWrapper } from './desktop_view'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;

  ${css.media.mobile`
    font-size: 12px;
    width: 50px;
    word-break: keep-all;
    margin-left: 15px;
  `};
`
export const ReplyAction = styled.div`
  color: ${theme('article.info')};
  opacity: 0.7;
  font-weight: bold;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MoreWrapper = styled.div`
  opacity: 0;

  ${CommentWrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
