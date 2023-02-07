import styled from 'styled-components'

import css from '@/utils/css'

export const BoardsWrapper = styled.div`
  ${css.flex('justify-center', 'align-end')};
  gap: 0 18px;
  width: 100%;
`
export const Board = styled.div<{ shadow?: boolean }>`
  ${css.flexColumn()};
  padding: 6px;
  gap: 6px;
  overflow: hidden;

  width: 168px;
  height: 300px;
  background: #c8d6f24f;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: ${({ shadow }) => (shadow ? '#c3d6f336 1px 5px 17px 7px' : 'none')}; ;
`
