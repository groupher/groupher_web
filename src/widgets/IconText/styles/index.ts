import styled from 'styled-components'

import type { TTestable, TSize } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

import { getIconSize, getTextSize, getMargin } from './metric'

type TIcon = {
  size: TSize
  margin: string
  $round: boolean
}

type TWrapper = { dimWhenIdle: boolean } & TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};
  opacity: ${({ dimWhenIdle }) => (dimWhenIdle ? 0.7 : 1)};

  &:hover {
    opacity: 1;
  }
`
export const Icon = styled(Img)<TIcon>`
  fill: ${theme('article.info')};
  ${({ size }) => css.size(getIconSize(size))};
  margin-right: ${({ size, margin }) => margin || getMargin(size)};
  border-radius: ${({ $round }) => ($round ? '100%' : '0')};
`
type TText = {
  size: TSize
}

export const Text = styled.div<TText>`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  font-size: ${({ size }) => getTextSize(size)};
`
