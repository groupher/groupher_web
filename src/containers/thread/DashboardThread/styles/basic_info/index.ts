import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 0 150px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
`
export const SavingWrapper = styled.div`
  width: 305px;
  margin-left: -5px;
`
export const Banner = styled.div`
  height: 70px;
  width: 100%;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 40px;
  position: relative;
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: -8px;
`
