import styled from 'styled-components'

import css from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  width: 100%;
`

export const InnerWrapper = styled.div`
  width: 480px;
  margin-left: -20px;
  ${css.flexColumn('align-start')};
`
export const EnableDesc = styled.div`
  width: 80%;
  line-height: 1.65;
`
