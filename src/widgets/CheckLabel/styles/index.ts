import styled from 'styled-components'

import type { TTestable, TActive } from '@/spec'
import HookSVG from '@/icons/Hook'
import { WithMargin } from '@/widgets/Common'
// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = TTestable

export const Wrapper = styled(WithMargin).attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};
`
export const CheckIcon = styled(HookSVG)<TActive>`
  ${css.size(13)}
  fill: ${theme('rainbow.green')};
  margin-right: 8px;

  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  max-width: ${({ $active }) => ($active ? 'auto' : 0)};
  transition: all 0.2s;
`
export const Title = styled.div<TActive>`
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-size: 13px;
`
