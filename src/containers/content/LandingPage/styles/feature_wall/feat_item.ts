import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import CheckSVG from '@/icons/CheckBold'

// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  margin-left: 18px;
`

export const CheckIcon = styled(CheckSVG)<{ featType: TFeatType }>`
  ${css.size(16)};
  fill: ${({ featType }) => FEAT[featType].COLOR};
  /* fill: ${theme('article.digest')}; */
  opacity: 0.6;
  margin-right: 14px;
`

export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
`
