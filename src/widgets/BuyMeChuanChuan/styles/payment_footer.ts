import Img from '@/Img'
import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  margin-right: 5px;
`
export const PayDesc = styled.div`
  ${css.row()};
  font-size: 0.8rem;
  color: ${theme('banner.desc')};
`
export const AliPay = styled.div`
  ${css.row('align-center')};
  margin-left: 5px;
  margin-right: 5px;
  color: #42abe1;
`
export const Weixin = styled.div`
  ${css.row('align-center')};
  color: #3eb64b;
  margin-left: 5px;
`
export const MoneyNum = styled.span`
  color: #ffdad3;
`
export const PaymentIcon = styled(Img)`
  ${css.size(16)};
`
