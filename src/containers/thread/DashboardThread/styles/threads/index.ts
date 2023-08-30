import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  padding: 0;
  padding-left: 156px;
  padding-right: 120px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const Desc = styled.div`
  width: 80%;
  line-height: 1.65;
`
