import styled, { css, theme } from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  max-width: 880px;
  min-height: 500px;
  border-radius: 12px;
  background: ${theme('alphaBg')};
  border: 1px solid;
  border-color: #e5e5e5;
  /* border-color: ${theme('hoverBg')}; */
  border-bottom: none;

  position: relative;
`
export const holder = 1
