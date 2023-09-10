import styled from 'styled-components'
import { theme } from '@/css'

import type { TProps } from '..'

export const Wrapper = styled.div<TProps>`
  width: ${({ radius }) => `${radius}px`};
  height: ${({ radius }) => `${radius}px`};
  border-radius: 100%;
  background-color: ${theme('article.digest')};
  opacity: 0.5;

  margin-left: ${({ space }) => `${space}px`};
  margin-right: ${({ space }) => `${space}px`};
  display: block;
`

export const Holder = 1
