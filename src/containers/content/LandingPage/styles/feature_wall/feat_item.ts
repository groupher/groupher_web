import styled from 'styled-components'

import css, { theme } from '@/css'

import CheckSVG from '@/icons/CheckBold'

// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-left: 18px;

  ${css.media.mobile`
    margin-left: 0;
    min-width: 50%;
  `};
`

export const CheckIcon = styled(CheckSVG)<{ featType: TFeatType }>`
  ${css.size(16)};
  fill: ${({ featType }) => FEAT[featType].COLOR};
  opacity: 0.6;
  margin-right: 14px;

  ${css.media.mobile`
    ${css.size(10)};
    margin-right: 5px;
  `};
`

export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;

  ${css.media.mobile`
    font-size: 12px;
  `};
`
