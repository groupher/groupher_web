import styled from 'styled-components'

import { theme } from '@/css'

import Input from '@/widgets/Input'

export { Desc } from '../base_info'

export const Wrapper = styled.div`
  padding-bottom: 30px;
  margin-bottom: 20px;
`
export const Label = styled.div<{ left?: number }>`
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: ${({ left }) => `${left || 0}px`};
`
export const Inputer = styled(Input)`
  width: 300px;
`
