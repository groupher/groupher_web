import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/Arrow'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
  gap: 0 40px;
`

export const InputWrapper = styled.div`
  ${css.flex('align-start')};
`
export const Label = styled.div`
  color: ${theme('article.digest')};
  white-space: nowrap;
  min-width: 50px;
  font-size: 13px;
  margin-top: 5px;
`

export const Inputer = styled(Input)`
  width: 220px;
  height: 32px;
  background: transparent;

  ::placeholder {
    font-size: 12px;
  }
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 10px;
`
