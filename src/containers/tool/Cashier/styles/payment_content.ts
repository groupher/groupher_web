import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumnGrow('align-center')};
  margin-top: 10px;
`
export const CountDesc = styled.div`
  color: ${theme('article.digest')};
  margin-bottom: 10px;
`
export const DescNumber = styled.span`
  color: #139c9e;
  font-weight: bold;
`
export const NextDesc = styled.div`
  margin-top: 15px;
  color: ${theme('article.digest')};
`
export const NextStepBtn = styled.span`
  border: 1px solid;
  border-color: ${theme('article.title')};
  padding: 0 3px;
  border-radius: 4px;
  margin-left: 6px;
  color: ${theme('article.title')};

  &:hover {
    color: ${theme('banner.title')};
    font-weight: bold;
    cursor: pointer;
    text-decoration: underline;
  }
`
export const PaymentPic = styled(Img)`
  width: 200px;
  height: auto;
  display: block;
`
