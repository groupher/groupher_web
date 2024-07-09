import styled, { css, theme } from '~/css'

import { WithPosition } from '~/widgets/Common'

export const Wrapper = styled.div`
  padding: 15px;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`
export const BlocksWrapper = styled(WithPosition)<{ $hovering: boolean }>`
  ${css.row('align-both')};
  width: 254px;
  height: 160px;
  padding: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 10px;
  box-shadow: ${theme('button.boxShadow')};
  background: ${({ $hovering }) => ($hovering ? '#ecececd9' : theme('htmlBg'))};
  overflow: hidden;
  transition: all .2s;
`
