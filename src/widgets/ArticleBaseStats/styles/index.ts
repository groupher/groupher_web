import type { TTestable } from '~/spec'

import ViewSVG from '~/icons/article/Viewed'
import CommentSVG from '~/icons/Comment'
import { WithMargin } from '~/widgets/Common'
import styled, { css, theme } from '~/css'

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
  ${css.size(13)};
  margin-right: 4px;
  transition: fill 0.25s;
`
export const CommentWrapper = styled.div`
  ${css.row('align-center')};
`
export const CommentIcon = styled(CommentSVG)`
  fill: ${theme('article.info')};
  ${css.size(12)};
  opacity: 0.85;

  ${CommentWrapper}:hover & {
    cursor: pointer;
    fill: ${theme('article.title')};
  }

  transition: fill 0.2s;
`
export const Count = styled.div`
  color: ${theme('article.info')};
  font-size: 16px;
  margin-left: 3px;
`
export const CommentCount = styled(Count)`
  margin-left: 8px;

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
