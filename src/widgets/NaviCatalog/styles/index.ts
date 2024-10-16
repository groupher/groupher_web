import type { TTestable, TActive } from '~/spec'
import Img from '~/Img'
import styled, { css, theme } from '~/css'

import { WIDTH } from './metric'

type TItem = TActive & { withDivider: boolean }

const activeColor = '#009C9E'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  width: ${WIDTH};
`

export const Item = styled.div<TItem>`
  ${css.row('justify-end', 'align-center')};
  fill: ${theme('article.digest')};
  color: ${({ active }) => (active ? activeColor : theme('article.digest'))};
  font-size: 14px;
  border-bottom: ${({ withDivider }) => (withDivider ? '1px solid' : 'none')};
  border-bottom-color: ${({ withDivider }) => (withDivider ? '#EFEEEE' : 'none')}; // to-theme

  padding: ${({ withDivider }) => (withDivider ? '8px 6px' : '6px')};

  &:hover {
    color: ${({ active }) => (active ? activeColor : theme('article.title'))};
    cursor: pointer;
  }

  :last-child {
    border-bottom: none;
  }
`
export const MoreItem = styled(Item)`
  font-size: 13px;
  justify-content: center;
  padding-right: 10px;
  margin-top: 8px;
`
export const FixedIcon = styled(Img)`
  ${css.size(14)};
  margin-right: 5px;
`
export const Icon = styled(Img)<TActive>`
  display: ${({ active }) => (active ? 'block' : 'none')};
  fill: ${({ active }) => (active ? activeColor : theme('article.digest'))};
  ${css.size(15, false)};

  ${Item}:hover & {
    display: block;
  }
`
export const ActiveDot = styled.div`
  background: ${theme('article.title')};
  width: 5px;
  height: 5px;
  border-radius: 50%;
`
