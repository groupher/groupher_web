import styled, { css, theme } from '~/css'
import EditPenSVG from '~/icons/EditPen'

export const Wrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  width: 154px;
`
export const Title = styled.div`
  letter-spacing: 2px;
  font-size: 12px;
  padding-left: 2px;
  font-weight: 550;
`
export const EditIcon = styled(EditPenSVG)`
  ${css.size(13)};
  fill: ${theme('button.fg')};
`
