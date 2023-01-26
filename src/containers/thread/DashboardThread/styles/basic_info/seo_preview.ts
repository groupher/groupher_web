import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  background: ${theme('alphaBg')};
  margin-bottom: 30px;
  padding: 20px 20px;
  border-radius: 5px;
  width: 460px;
  margin-left: -10px;
  box-shadow: ${css.cardShadow};
  position: relative;
`
export const Hint = styled.div`
  font-size: 10px;
  position: absolute;
  right: 8px;
  top: 8px;
  color: ${theme('lightText')};
`
export const URL = styled.div`
  font-size: 13px;
  line-height: 1.3;
  font-style: normal;
  color: #202124;
`
export const Title = styled.div`
  display: inline-block;
  line-height: 1.3;
  margin-bottom: 3px;
  padding-top: 6px;
  font-size: 20px;
  font-weight: 400;
  font-family: arial, sans-serif;

  color: #1a0dab;
  ${css.lineClamp(1)};
`
export const Desc = styled.div`
  font-size: 13px;
  color: #4d5156;
  ${css.lineClamp(2)};
  line-height: 1.58;
  text-align: left;
`
