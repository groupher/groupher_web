import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('')};
  padding-left: 160px;
  width: 520px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const Banner = styled.div`
  height: 70px;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 30px;
  position: relative;
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -14px;
`
