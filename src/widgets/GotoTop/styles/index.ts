import styled from 'styled-components'

import type { TTestable } from '@/spec'
import css, { theme } from '@/css'

import AirBalloonSVG from '@/widgets/Icons/AirBalloon'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.size(30)};
  ${css.row('align-both')};
`
export const AirBalloonIcon = styled(AirBalloonSVG)`
  ${css.size(16)};
  fill: ${theme('article.info')};
  cursor: pointer;
`
