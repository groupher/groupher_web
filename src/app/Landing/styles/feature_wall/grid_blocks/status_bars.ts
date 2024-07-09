import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 2px;
  width: auto;
  height: 18px;
  margin-top: 5px;
  margin-bottom: 6px;
  margin-left: 4px;
`
export const Bar = styled.div<{ $opacity?: number }>`
  width: 3px;
  height: 100%;
  border-radius: 10px;
  background: ${theme('rainbow.green')};
  background: #8bc34ae8;
`
