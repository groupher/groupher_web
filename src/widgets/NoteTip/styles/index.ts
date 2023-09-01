import styled from 'styled-components'

import type { TSpace, TTestable } from '@/spec'

import InfoSVG from '@/icons/Info'

// import Img from '@/Img'
import css, { theme } from '@/css'

type TWrapper = TTestable & TSpace & { fontSize: number }

export const Wrapper = styled.div.attrs(({ testid }: TTestable) => ({
  'data-test-id': testid,
}))<TWrapper>`
  ${(props) => css.spaceMargins(props)};
  ${css.row('align-both')};
  width: ${({ fontSize }) => `${fontSize}px`};
  height: ${({ fontSize }) => `${fontSize}px`};
`
export const InfoIcon = styled(InfoSVG)<{ fontSize: number }>`
  ${({ fontSize }) => css.size(fontSize)};
  fill: ${theme('hint')};
`
export const Note = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  padding: 8px 10px;
  max-width: 200px;
`
