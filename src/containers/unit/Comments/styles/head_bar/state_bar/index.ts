import styled, { css, theme } from '@/css'

import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  margin-bottom: 10px;
`
export const TotalCountWrapper = styled.div`
  flex-grow: 1;
`
export const TotalTitle = styled.div`
  ${css.row('align-end')};
  color: ${theme('article.title')};
  font-size: 15px;
  font-weight: bold;
`
export const TotalNum = styled.span`
  color: ${theme('article.digest')};
  font-size: 14px;
  font-weight: 400;
  margin-left: 6px;
  opacity: 0.8;
`

export const CommentBlock = styled.div`
  ${css.row()};
  margin-bottom: 16px;
  padding: 15px;
  padding-left: 20px;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 3px;
  background: ${theme('drawer.bg')};
`
export const ActionsWrapper = styled.div`
  ${css.row('align-center')};
`
export const EditIcon = styled(EditPenSVG)`
  ${css.size(12)};
  fill: white;
  margin-right: 5px;
`
