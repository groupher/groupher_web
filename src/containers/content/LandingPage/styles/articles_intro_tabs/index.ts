import styled from 'styled-components'

import css from '@/css'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  margin-top: 140px;
`

export const FeatList = styled.div`
  ${css.column()};
  gap: 18px 0;
  margin-top: 28px;

  ${css.media.mobile`
    ${css.row()};
  `};
`

export const MobileIntroLists = styled.div`
  ${css.rowWrap()};
  gap: 16px 0;
  padding-left: 10px;
  margin-top: -25px;
`
