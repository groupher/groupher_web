import styled from 'styled-components'

import type { TTestable } from '@/spec'

// import Img from '@/Img'
import css, { theme } from '@/utils/css'

type TWrapper = {
  withBorder: boolean
} & TTestable

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.flexColumn('align-center')};
  padding-bottom: 40px;
  border-left: 1px solid;
  border-left-color: ${({ withBorder }) => (withBorder ? theme('divider') : 'transparent')};
`

export const Title = styled.div``
