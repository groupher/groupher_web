import type { TTestable } from '~/spec'

import styled, { css, theme } from '~/css'
import Img from '~/Img'
import { WithMargin } from '~/widgets/Common'

type TWrapper = {
  noBg: boolean
} & TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-start')};
  color: ${({ noBg }) => (noBg ? theme('article.digest') : theme('article.title'))};
  padding-left: ${({ noBg }) => (noBg ? '5px' : '12px')};
  padding-right: 15px;
  padding-top: 8px;
  padding-bottom: 7px;
  /* width: 100%; */
  min-height: 36px;
  background: ${({ noBg }) => (noBg ? 'transparent' : '#FDF6E8')};
  border-radius: 8px;
`
export const Main = styled.div`
  flex-grow: 1;
  font-size: 13px;
  margin-top: 1px;
  line-height: 1.85;
  width: calc(100% - 18px);
`
export const UserName = styled.span`
  color: ${theme('article.title')};
  margin-right: 5px;
`
export const AuthorTag = styled.span`
  color: ${theme('article.digest')};
  margin-left: 2px;
  margin-right: 5px;
`
export const Timestamp = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const Why = styled(Img)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-left: 10px;
  margin-top: -1px;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`
