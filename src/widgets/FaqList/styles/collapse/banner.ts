import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import { Wrapper as MainWrapper } from './index'

export const Wrapper = styled.div`
  position: relative;
  ${css.flex('align-center')};
  margin-bottom: 34px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 22px;
  font-weight: 500;
`
export const MenuWrapper = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  display: none;

  ${MainWrapper}:hover & {
    display: block;
  }
`
