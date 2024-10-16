import type { TTestable } from '~/spec'

import styled, { css, theme } from '~/css'
import CommentSVG from '~/icons/Comment'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.row('align-start')};
  padding-top: 12px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 30px;
`
export const Main = styled.div`
  width: 560px;
  min-height: 220px;
  padding-bottom: 30px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 20px;
  font-weight: 580;
  margin-bottom: 6px;
`
export const TagsWrapper = styled.div`
  margin-bottom: 10px;
`
export const Body = styled.div`
  color: ${theme('article.digest')};
  font-size: 15px;
  line-height: 1.85;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  margin-top: 20px;
  margin-left: -5px;
`
export const CommentWrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 20px;
`
export const CommentIcon = styled(CommentSVG)`
  ${css.size(13)};
  fill: ${theme('article.info')};
`
export const Text = styled.div`
  color: ${theme('article.info')};
  font-size: 13px;
  margin-left: 6px;
`
export const Side = styled.div`
  ${css.column('align-end')};
  color: ${theme('article.digest')};
  flex-grow: 1;
  margin-top: 10px;
  margin-right: -10px;
`
export const DateTime = styled.div`
  font-size: 13px;
  opacity: 0.8;
`
export const Version = styled.span`
  color: ${theme('article.digest')};
  font-size: 17px;
  font-weight: 580;
`
