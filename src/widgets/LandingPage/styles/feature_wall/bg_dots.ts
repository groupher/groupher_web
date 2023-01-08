import styled from 'styled-components'

import type { TActive } from '@/spec'
import css from '@/utils/css'

import type { TFeatType } from '../../spec'
import { FEAT } from '../../constant'

type TWrapper = { featType: TFeatType } & TActive
export const Wrapper = styled.div<TWrapper>`
  ${css.size(600)};
  background: ${({ featType }) => `radial-gradient(${FEAT[featType].COLOR} 1px, transparent 1px)`};

  background-size: 25px 25px;
  position: absolute;
  top: -80px;
  border-radius: 100px;

  opacity: ${({ $active }) => ($active ? 0.8 : 0)};

  transition: all 0.2s;
  transition-delay: 1s;

  z-index: -1;
`

export const holder = 1
