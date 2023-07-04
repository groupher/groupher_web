import styled from 'styled-components'

import type { TTestable } from '@/spec'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>``

export const MoreIcon = styled(Img)`
  ${css.size(18)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`
