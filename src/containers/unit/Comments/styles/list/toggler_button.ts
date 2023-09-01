import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  padding-top: 25px;
  padding-bottom: 18px;
  margin-left: 25px;
`
export const SlashSign = styled.div`
  font-size: 11px;
  font-weight: bolder;
  font-family: monospace;
  opacity: 0.8;
`

export const Text = styled.div`
  font-size: 12px;
  color: ${theme('article.info')};
  margin-left: 14px;
  font-weight: bold;
  opacity: 0.85;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`
