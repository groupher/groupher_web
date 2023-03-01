import styled from 'styled-components'

import css from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  position: relative;
  width: 1080px;
  border-radius: 12px;

  ${css.media.mobile`
    display: none;
  `};
`

export const ParallaxWrapper = styled.div`
  width: 1080px;
  position: relative;
  z-index: 100;
  z-index: 2;
`
