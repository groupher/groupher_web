import styled from 'styled-components'

import type { TColor, TColorName, TTestable } from '@/spec'
import InfoSVG from '@/icons/Info'

import { MarkdownStyles } from '@/widgets/Common'
import css, { rainbowLight, theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.rowWrap('justify-between')};

  border-bottom: 1px solid;
  border-color: ${theme('divider')};
  padding: 20px 0;
  padding-top: 15px;
  margin-bottom: 25px;
  margin-top: -8px;
`
export const Header = styled.div`
  ${css.row('align-center')};
  margin-bottom: 8px;
  width: 100%;
`
export const BgWrapper = styled.div<TColor>`
  ${css.row('align-both')};
  background: ${({ $color }) => rainbowLight($color)};
  margin-left: -2px;
  padding-left: 6px;
  padding-right: 10px;
  border-radius: 10px;
`
export const Title = styled.h3<{ color: TColorName }>`
  color: ${theme('article.title')};
  font-weight: 450;
  position: relative;
  z-index: 2;
`
// &:before {
//   content: '';
//   position: absolute;
//   left: 0;
//   bottom: 4px;
//   background: ${(props) => {
//     const { color } = props
//     // @ts-ignore
//     const colorVal = rainbow(color)(props)

//     return `linear-gradient(180deg, transparent 30%, ${colorVal} 0)`
//   }};
//   opacity: 0.2;
//   width: 100%;
//   height: 15px;
//   border-radius: 3px;
//   z-index: -1;
// }

export const Desc = styled(MarkdownStyles)`
  line-height: 1.75em;
  font-size: 13px;
  color: ${theme('article.digest')};
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-right: 2px;
  margin-bottom: 3px;
  opacity: 0.7;

  /* transform: rotate(45deg); */
`
