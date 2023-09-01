import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.article`
  ${css.row()};
  position: relative;

  padding: 8px 0;
  transition: all 0.2s;

  ${css.media.mobile`
    padding: 4px 0;
  `};
`
export const Main = styled.div`
  ${css.columnGrow()};
`
