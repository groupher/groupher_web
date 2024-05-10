import styled, { css, theme } from '@/css'

import type { TSpace } from '@/spec'
// import InfoSVG from '@/icons/Info'
import Input from '@/widgets/Input'

export const Wrapper = styled.ul<TSpace>`
  ${css.column()};
  width: 100%;
  ${(props) => css.spaceMargins(props)};
`
export const Note = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-bottom: 12px;
`
export const Bold = styled.span`
  font-size: 14px;
  font-weight: 680;
  color: ${theme('article.title')};
  margin-left: 3px;
  margin-right: 3px;
`
export const Inputer = styled(Input)`
  width: 100%;
  font-size: 13px;

  ::placeholder {
    font-size: 12px;
  }
`
