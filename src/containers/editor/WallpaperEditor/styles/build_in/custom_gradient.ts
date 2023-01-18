import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  ${css.flex()};
  width: 100%;
  margin-top: 25px;
  padding: 20px 10px;

  border: 1px solid;
  border-color: ${theme('article.digest')};
  border-radius: 5px;
  position: relative;
`

export const Label = styled.div`
  position: absolute;
  top: -10px;
  left: 5px;
  padding: 0 5px;
  background: white;
  font-size: 12px;
`

export const Inputer = styled(Input)`
  width: 100%;
  font-size: 13px;

  ::placeholder {
    font-size: 12px;
  }
`

export const Block = styled.div`
  margin-right: 12px;
`
