import styled, { css, theme } from '@/css'

import AdderSVG from '@/icons/Plus'
import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.column()};
  width: 400px;
  margin-bottom: 36px;
`
export const Preview = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const PreviewButtonsWrapper = styled.div`
  ${css.row('align-center')};
  margin-top: 8px;
`
export const Head = styled.div`
  ${css.row('align-start')};
`
export const Title = styled.div`
  flex-grow: 1;
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: bold;
  max-width: 80%;
`
export const UpdateHint = styled.div`
  width: 20%;
  text-align: right;
  font-size: 10px;
  color: ${theme('hint')};
  margin-top: 4px;
`

export const ButtonsWrapper = styled(PreviewButtonsWrapper)`
  gap: 0 15px;
  margin-top: 5px;
`
export const AddIcon = styled(AdderSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
  opacity: 0.6;
`

export const EditIcon = styled(EditPenSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 6px;
  opacity: 0.6;
`
