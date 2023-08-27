import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  width: 100%;
  margin-top: 10px;
`
export const CatsWrapper = styled.div`
  ${css.flex('justify-start')};
  flex-wrap: wrap;
  gap: 15px 20px;

  flex-grow: 1;
  width: 100%;
  min-height: 600px;

  border-radius: 6px;
  margin-top: 5px;
`
