import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/Arrow'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.flexColumn('align-start')};
`
export const InputWrapper = styled.div`
  ${css.flex('align-start')};
`
export const Inputer = styled(Input)`
  width: 100%;
  height: 32px;
  background: transparent;

  ::placeholder {
    font-size: 12px;
  }
`

export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  margin-right: 8px;
`