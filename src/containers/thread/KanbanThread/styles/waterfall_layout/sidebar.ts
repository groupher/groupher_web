import styled, { css, theme } from '@/css'
import KanbanSVG from '@/icons/Kanban'

export const Wrapper = styled.div`
  ${css.column('justify-between', 'align-start')};
  width: 260px;
  padding-left: 20px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.title')};
  font-size: 16px;
  font-weight: 500;
  margin-top: 6px;
`
export const Count = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-left: 10px;
  opacity: 0.8;
  margin-top: 2px;
  font-weight: 400;
`
export const TopPart = styled.div`
  ${css.row('align-center')};
`
export const KanbanIcon = styled(KanbanSVG)`
  ${css.size(15)};
  fill: ${theme('article.info')};
  margin-right: 8px;
  margin-top: 6px;
  transform: rotate(180deg);
`
export const ModeWrapper = styled.div`
  margin-top: 2px;
  transform: scale(0.85);
`
export const BottomPart = styled.div`
  ${css.row('align-center')};
`
export const JoinTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-right: 10px;
  margin-top: 1px;
`
