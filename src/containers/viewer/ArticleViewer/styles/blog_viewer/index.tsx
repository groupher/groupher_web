import styled from 'styled-components'

import { theme } from '@/css'

export const Wrapper = styled.div`
  padding: 0 8px;
`
export const BodyWrapper = styled.div`
  padding: 20px 0;
  min-height: 300px;
  margin-top: 5px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 25px;
`
