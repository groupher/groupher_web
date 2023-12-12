import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  margin-top: 10px;
  border-top: 1px solid;
  border-top-color: ${theme('popover.borderColor')};
`
export const ButtonsWrapper = styled.div`
  padding-top: 8px;
  ${css.row('align-both')};
`
export const RedButton = styled.div`
  color: ${theme('rainbow.red')};
  font-size: 13px;
  filter: saturate(0.8);

  &:hover {
    cursor: pointer;
    filter: saturate(1);
  }
`
export const CancelButton = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
