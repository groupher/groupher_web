import styled from 'styled-components'

import type { TTestable, TSize } from '@/spec'
import Img from '@/Img'
import css, { theme } from '@/css'

import { getIconSize, getTextSize, getMargin } from './metric'

type TIcon = {
  size: TSize
  margin: string
  round: boolean
  highlight: boolean
}

type TWrapper = { dimWhenIdle: boolean } & TTestable
export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flex('align-center')};
  opacity: ${({ dimWhenIdle }) => (dimWhenIdle ? 0.7 : 1)};

  &:hover {
    opacity: 1;
  }
`
export const Icon = styled(Img)<TIcon>`
  fill: ${theme('article.info')};
  /* fill: ${({ highlight }) => (highlight ? theme('article.title') : theme('article.digest'))}; */
  ${({ size }) => css.size(getIconSize(size))};
  margin-right: ${({ size, margin }) => margin || getMargin(size)};
  border-radius: ${({ round }) => (round ? '100%' : '0')};
`
type TText = {
  size: TSize
  highlight: boolean
}

export const Text = styled.div<TText>`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  /* color: ${({ highlight }) => (highlight ? theme('article.title') : theme('article.digest'))}; */
  font-size: ${({ size }) => getTextSize(size)};
`
