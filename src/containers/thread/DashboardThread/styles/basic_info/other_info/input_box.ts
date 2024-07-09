import styled, { css, theme } from '~/css'
import DeleteSVG from '~/icons/DeleteSolid'

export { Desc, Inputer } from '.'

export const Wrapper = styled.div`
  width: 300px;
`
export const InputWrapper = styled.div`
  position: relative;
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
