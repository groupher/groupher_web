import styled from 'styled-components'

import css from '@/css'

export const BoardsWrapper = styled.div`
  ${css.row('justify-center', 'align-end')};
  gap: 0 18px;
  width: 100%;
`
export const Board = styled.div<{ shadow?: boolean }>`
  ${css.column()};
  padding: 6px;
  gap: 6px;
  overflow: hidden;

  width: 168px;
  height: 300px;
  /* background: linear-gradient(180deg, #c8d6f24f 34%, #c8d6f24f 100%); */
  background: linear-gradient(180deg, #c8d6f24f 34%, #deecff4f 100%);
  background: #d8deec4f;

  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  box-shadow: ${({ shadow }) => (shadow ? '#c3d6f336 1px 5px 17px 7px' : 'none')}; ;
`
