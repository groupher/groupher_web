import styled from 'styled-components'

import type { TTestable } from '@/spec'

import ViewSVG from '@/icons/View'
import CommentSVG from '@/icons/Comment'
import { WithMargin } from '@/widgets/Common'
import css, { theme } from '@/css'

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-center')};
  line-height: 20px;

  ${css.media.mobile`
    transform: scale(0.9);
  `};
`
export const ViewsIcon = styled(ViewSVG)`
  fill: ${theme('article.info')};
  ${css.size(12)};
  margin-top: 1px;
  transition: fill 0.25s;
`
export const CommentWrapper = styled.div`
  ${css.row('align-center')};
`
export const CommentIcon = styled(CommentSVG)`
  fill: ${theme('article.info')};
  ${css.size(12)};
  margin-top: 1px;

  ${CommentWrapper}:hover & {
    cursor: pointer;
    fill: ${theme('article.title')};
  }

  transition: fill 0.2s;
`
export const Count = styled.div`
  color: ${theme('article.info')};
  font-size: 15px;
  margin-left: 6px;
  margin-top: 1px;
`
export const CommentCount = styled(Count)`
  margin-left: 6px;
  ${CommentWrapper}:hover & {
    cursor: pointer;
    color: ${theme('article.title')};
  }
  transition: color 0.2s;
`

export const Divider = styled.div`
  margin: 0 9px;

  ${css.media.mobile`
     margin: 0 6px;
  `};
`
