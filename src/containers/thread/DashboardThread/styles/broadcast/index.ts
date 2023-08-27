import styled from 'styled-components'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  width: 100%;
`
export const Banner = styled.div`
  height: 140px;
  width: 520px;
  padding: 10px;
  margin-left: -15px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
  margin-bottom: 40px;
  position: relative;
`
export const TabsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`
export const InnerWrapper = styled.div`
  width: 480px;
  margin-left: -20px;
  ${css.flexColumn('align-start')};
`
