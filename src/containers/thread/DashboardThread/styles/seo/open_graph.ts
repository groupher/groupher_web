import styled, { css, theme } from '@/css'
import ArrowLinker from '@/widgets/ArrowLinker'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const Row = styled.div`
  ${css.row('align-center')};
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Inputer = styled(Input)`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 300px !important;
  background: transparent;
`
export const EnableDesc = styled.div`
  ${css.row('align-center')};
  width: 80%;
  line-height: 1.65;
`
export const DetailLink = styled(ArrowLinker)`
  display: inline-block;
  opacity: 0.8;
`
