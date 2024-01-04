import styled, { css, theme } from '@/css'

import Input from '@/widgets/Input'
import ArrowSVG from '@/icons/ArrowSolid'

export const Wrapper = styled.div`
  ${css.column()};
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  padding: 15px 0;
  width: 100%;
`
export const Title = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  width: 130px;
`
export const AliasTitle = styled(Title)`
  width: auto;
`
export const Header = styled.div`
  ${css.row('align-center')};
`
export const ArrowWrapper = styled.div`
  ${css.row('align-center')};
  flex-grow: 1;
  padding-right: 60px;
`
export const ArrowLine = styled.div`
  border-top: 1px dashed;
  border-top-color: ${theme('article.digest')};
  flex-grow: 1;
  opacity: 0.8;
  height: 1px;
  margin-right: 6px;
`
export const ArrowIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  ${css.size(12)};
  opacity: 0.7;
`
export const InputWrapper = styled.div`
  width: 180px;
`
export const Inputer = styled(Input)`
  height: 28px;
`
export const Footer = styled.div`
  ${css.row('align-center')};
  height: 40px;
  margin-left: -1px;
`
