import styled from 'styled-components'

import css, { theme } from '@/css'

import type { TActive } from '@/spec'
// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Wrapper = styled.div<{ alignRight: boolean }>`
  ${css.column()};
  align-items: ${({ alignRight }) => (alignRight ? 'flex-end' : 'flex-start')};
`
export const Title = styled.div<{ featType: TFeatType }>`
  ${css.row('align-center')};
  /* color: ${({ featType }) => FEAT[featType].COLOR}; */
  color: ${theme('article.title')};
  font-size: 21px;
  font-weight: 500;
  text-shadow: rgb(0 0 0 / 8%) 0px 10px 20px;

  ${css.media.mobile`
    font-size: 20px;
    padding-left: 5px;
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

export const Desc = styled.div<{ alignRight: boolean }>`
  font-size: 16px;
  color: ${theme('hint')};
  margin-top: 12px;
  width: 300px;

  text-align: ${({ alignRight }) => (alignRight ? 'right' : 'left')};

  ${css.media.mobile`
    font-size: 14px;
    width: 100%;
    padding: 0 5px;
  `};
`
