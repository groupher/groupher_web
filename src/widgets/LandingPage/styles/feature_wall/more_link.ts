import styled from 'styled-components'
import Link from 'next/link'

// import type { TActive, TTestable } from '@/spec'
import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

import css from '@/utils/css'
import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled(Link)`
  ${css.flex('align-center')};
  text-decoration: none;
  opacity: 0.8;

  &:hover {
    text-decoration: none;
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const Text = styled.div<{ featType: TFeatType }>`
  color: ${({ featType }) => FEAT[featType].COLOR};
  font-weight: 600;
  font-size: 16px;
`
export const ArrowIcon = styled(ArrowSVG)<{ featType: TFeatType }>`
  ${css.size(14)};
  fill: ${({ featType }) => FEAT[featType].COLOR};
  margin-left: 10px;
  transform: rotate(180deg);
`
