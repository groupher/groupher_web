import styled from 'styled-components'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TTestable>`
  ${css.flex('align-center')};
`
export const Block = styled.div`
  width: 30%;
  height: 60px;
  background: ${theme('hoverBg')};
  margin-right: 10px;
  border-radius: 5px;
`

export const MobileBlock = styled.div`
  width: 96%;
  height: 60px;
  background: ${theme('hoverBg')};
  border-radius: 5px;
`
