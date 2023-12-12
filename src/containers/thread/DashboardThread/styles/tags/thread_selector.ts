import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row()};
  padding-right: 30px;
  width: 100%;
  margin-bottom: 20px;

  ${css.media.mobile`
    padding-right: 0;
  `};
`
export const Hint = styled.div`
  font-size: 13px;
  color: ${theme('hint')};
  margin-top: 3px;
  width: 70px;
  min-width: 70px;
`
export const CatsWrapper = styled.div`
  ${css.rowWrap('align-center')};
  margin-left: 15px;
  gap: 14px;

  ${css.media.mobile`
    margin-left: 0;
    gap: 6px;
  `};
`
