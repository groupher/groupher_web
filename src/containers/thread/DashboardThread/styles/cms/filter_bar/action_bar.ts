import styled, { css, theme } from '@/css'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  width: calc(100% + 5px);
  min-height: 52px;
  padding-right: 5px;
  margin-left: 3px;
  margin-top: 15px;
`
export const MainWrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
  margin-left: -8px;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 0;
  height: 34px;
  background: linear-gradient(to right, #fffbe9 30%, transparent);
`
export const Note = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 12px;
`
export const Focus = styled.div`
  color: ${theme('rainbow.red')};
  font-weight: 600;
  font-size: 14px;
  margin-left: 4px;
  margin-right: 5px;
  margin-top: -2px;
`

export const ActionNotes = styled.div`
  ${css.row('align-center')};
  margin-left: 5px;
`
export const DeleteNote = styled.div`
  color: ${theme('rainbow.red')};
  font-size: 12px;
  font-weight: 600;
  margin-left: 8px;
`

export const ConfirmButton = styled(Button)`
  transform: scale(0.95);
`
