import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column()};
  width: 460px;
  margin-left: 120px;

  ${css.media.mobile`
    padding: 0;
  `};
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
  left: -14px;
`
