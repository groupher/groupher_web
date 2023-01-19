import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import type { TActive } from '@/spec'
// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Title = styled.div<{ featType: TFeatType }>`
  ${css.flex('align-center')};
  color: ${({ featType }) => FEAT[featType].COLOR};
  font-size: 21px;
  font-weight: 600;
`

export const Hint = styled.div<TActive>`
  font-size: 22px;
  margin-left: 15px;
  opacity: ${({ $active }) => ($active ? 0.3 : 0)};

  font-style: italic;

  transition: all 0.3s;
  transition-delay: 0.5s;
`

export const Desc = styled.div`
  font-size: 17px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  width: 340px;
`
