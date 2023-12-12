import styled, { css, theme } from '@/css'

import DeleteSVG from '@/icons/DeleteSolid'
import Input from '@/widgets/Input'

export { Icon } from '.'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  position: relative;
`
export const Inputer = styled(Input)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background: transparent;

  ::placeholder {
    font-size: 12px;
  }
`
export const DeleteWrapper = styled.div`
  ${css.circle(18)};
  ${css.row('align-both')};
  position: absolute;
  top: 8px;
  right: -8px;
  background: #ffffff42;
  z-index: 2;
`
export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};
  opacity: 1;

  ${DeleteWrapper}:hover & {
    fill: ${theme('rainbow.red')};
    opacity: 1;
    cursor: pointer;
  }

  &:before {
    content: '';
    position: absolute;
    ${css.size(18)};
  }

  transition: all 0.2s;
`

export const IconWrapper = styled.div`
  border: 1px solid;
  border-color: ${theme('editor.border')};
  ${css.row('align-both')};
  width: 38px;
  height: 34px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-right: none;
`
export const Hint = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
  margin-top: 15px;
  margin-left: 2px;
`
export const PlatformWrapper = styled.div`
  ${css.rowWrap('align-center')};
  gap: 12px 15px;
  margin-top: 10px;
  background: ${theme('hoverBg')};
  padding: 12px 10px;
  border-radius: 5px;
`
