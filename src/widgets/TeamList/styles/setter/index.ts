import styled, { theme } from '@/css'

export const Wrapper = styled.div`
  background: ${theme('modal.subPanel')};
  min-height: 360px;
`

export const EmptyHint = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  margin-top: 15px;
  margin-left: 20px;
`
