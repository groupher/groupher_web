import styled from 'styled-components'

import type { TTestable, TActive, TSpace } from '@/spec'
import HookSVG from '@/icons/Hook'

// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = TTestable & TSpace

export const Wrapper = styled.div.attrs<TTestable>(({ testid }) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${css.row('align-center')};

  ${(props) => css.spaceMargins(props)};
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
