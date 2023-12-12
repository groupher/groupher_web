import styled, { css, theme } from '@/css'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 10px;
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('lightText')};
  margin-left: 2px;
`
export const List = styled.div`
  ${css.row('align-center')};
  margin-left: 12px;
  gap: 10px;
`
export const Item = styled(Button)`
  height: 18px;
  opacity: 0.8;
  padding-top: 1px;
  padding-left: 6px;
  padding-right: 6px;
  border: 1px dotted;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
