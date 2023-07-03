import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import AdderSVG from '@/icons/Plus'
import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.flexColumn()};
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
  ${css.flex('align-center')};
  margin-top: 8px;
`
export const Head = styled.div`
  ${css.flex('align-start')};
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
  color: ${theme('article.digest')};
  opacity: 0.8;
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
