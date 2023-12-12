// import Img from '@/Img'
import styled, { css } from '@/css'
import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  width: 72px;
`
export const Title = styled.div`
  letter-spacing: 2px;
  font-size: 11px;
  padding-left: 2px;
  font-weight: 550;
`
export const EditIcon = styled(EditPenSVG)`
  ${css.size(11)};
  fill: white;
  margin-right: 5px;
  margin-top: -1px;
`
