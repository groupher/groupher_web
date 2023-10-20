import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import SearchSVG from '@/icons/HeaderSearch'
import { WithMargin } from '@/widgets/Common'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin).attrs<TWrapper>(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};
  border: 1px solid transparent;
  padding: 2px 10px;
  border-radius: 5px;

  &:hover {
    border: 1px solid;
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`
export const SearchIcon = styled(SearchSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  z-index: 1;
  margin-right: 8px;
  margin-top: -1px;
  opacity: 0.6;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
    opacity: 0.8;
  }

  ${css.media.mobile`
    margin-right: 1px;
    opacity: 0.8;
  `};
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  word-break: keep-all;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    opacity: 0.8;
  }

  ${css.media.mobile`
    display: none;
  `};
`
