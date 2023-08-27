import styled from 'styled-components'

import css, { theme } from '@/css'

import Input from '@/widgets/Input'

export const Wrapper = styled.div`
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const Label = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
`
export const Inputer = styled(Input)`
  margin-top: 10px;
  margin-bottom: 20px;
  width: 300px;
  background: transparent;
`
