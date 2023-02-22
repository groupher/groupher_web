import styled from 'styled-components'

import type { TColorName } from '@/spec'

import css, { theme } from '@/utils/css'
import { camelize } from '@/utils/fmt'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 8px;
  margin-left: -2px;

  ${css.media.mobile`
    gap: 6px;
  `};
`

export const TagWrapper = styled.div<{ color: TColorName }>`
  background: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
  padding: 2px 10px;
  border-radius: 10px;

  ${css.media.mobile`
    padding: 2px 6px;
  `};
`

export const Name = styled.div`
  /* color: ${({ color }) => theme(`baseColor.${camelize(color)}`)}; */
  color: ${theme('article.digest')};
  font-size: 11px;
  font-weight: 400;
`
