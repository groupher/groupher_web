import styled from 'styled-components'

// import Img from '@/Img'
import css from '@/css'
import EditPenSVG from '@/icons/Plus'

export const Wrapper = styled.div`
  ${css.row('justify-between', 'align-center')};
  width: 120px;
  padding-left: 5px;
  padding-right: 5px;
`
export const Title = styled.div`
  letter-spacing: 2px;
  font-size: 11px;
  padding-left: 2px;
`
export const EditIcon = styled(EditPenSVG)`
  ${css.size(11)};
  fill: white;
  opacity: 0.8;
  margin-right: 5px;
`
