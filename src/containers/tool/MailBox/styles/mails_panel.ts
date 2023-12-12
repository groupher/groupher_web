import styled, { theme } from '@/css'

export const Wrapper = styled.div`
  width: 370px;
  min-height: 300px;
  height: 400px;
  padding: 10px;
`
export const ContentWrapper = styled.div`
  /* height: 300px; */
  /* overflow: scroll; */
`
export const SeeAllMessages = styled.div`
  color: ${theme('banner.title')};
  text-align: center;
  margin-top: 10px;
  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`
