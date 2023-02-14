import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import type { TActive } from '@/spec'
// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Title = styled.div<{ featType: TFeatType }>`
  ${css.flex('align-center')};
  /* color: ${({ featType }) => FEAT[featType].COLOR}; */
  color: ${theme('article.title')};
  font-size: 21px;
  font-weight: 500;
  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;

  ${css.media.mobile`
    font-size: 20px;
  `};
`

export const Hint = styled.div<TActive>`
  font-size: 22px;
  margin-left: 15px;
  opacity: ${({ $active }) => ($active ? 0.2 : 0)};

  font-style: italic;

  transition: all 0.3s;
  transition-delay: 0.5s;

  ${css.media.mobile`
    font-size: 20px;
    margin-left: 8px;
  `};
`

export const Desc = styled.div`
  font-size: 16px;
  color: ${theme('article.digest')};
  margin-top: 12px;
  width: 340px;
  opacity: 0.65;

  ${css.media.mobile`
    font-size: 14px;
    width: 100%;
  `};
`
