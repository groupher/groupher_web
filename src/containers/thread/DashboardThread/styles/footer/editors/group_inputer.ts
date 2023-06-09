import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import BackSVG from '@/icons/Back'

import Input from '@/widgets/Input'

export const Wrapper = styled.div<{ width: string }>`
  ${css.flex('align-center')}
  width: ${({ width }) => width};
`
export const Inputer = styled(Input)`
  flex-grow: 1;
  height: 28px;
  font-size: 13px;
  background: transparent;
  /* border: 1px solid;
  border-color: ${theme('divider')}; */

  ::placeholder {
    color: ${theme('article.digest')};
    opacity: 0.8;
  }
`

export const BackIcon = styled(BackSVG)`
  ${css.size(20)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`
