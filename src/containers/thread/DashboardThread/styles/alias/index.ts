import styled from 'styled-components'

import css, { theme } from '@/css'
import { ALIGN_HEADER_OFFSET } from '../../constant'

export const Wrapper = styled.div`
  ${css.flexColumn()};
  padding: 0 80px;
  padding: ${() => `0 ${ALIGN_HEADER_OFFSET}`};
  padding-right: 120px;

  ${css.media.mobile`
    padding: 0 20px;
  `};
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
  left: -14px;
`
