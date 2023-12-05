import styled from 'styled-components'

import css, { theme } from '@/css'

export const BoardsWrapper = styled.div`
  ${css.row('justify-center', 'align-end')};
  gap: 0 28px;
  width: 100%;
`
export const Board = styled.div<{ shadow?: boolean }>`
  ${css.column()};
  padding: 6px;
  gap: 6px;
  overflow: hidden;

  width: 200px;
  height: 332px;
  background: linear-gradient(180deg, #c8d6f24f 34%, #deecff2e 100%);
  /* background: linear-gradient(180deg, #dfdfdf4f 34%, #d7d7d72e 100%); */

  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: ${theme('button.boxShadow')};
`
