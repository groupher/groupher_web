import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  padding: 0 150px;
`
export const Banner = styled.div`
  height: 70px;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 40px;
  position: relative;
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -8px;
`

export const EnableDesc = styled.div`
  width: 80%;
  line-height: 1.65;
`
