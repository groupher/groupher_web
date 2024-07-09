import type { TSpace, TTestable } from '~/spec'

import InfoSVG from '~/icons/Info'
import DangerSVG from '~/icons/Warning'

// import Img from '~/Img'
import styled, { css, animate, theme } from '~/css'

type TWrapper = TTestable & TSpace

const Wrapper = styled.article.attrs<TWrapper>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TWrapper>`
  ${css.row('align-start')};
  gap: 0 6px;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  padding: 6px 10px;
  border-radius: 8px;
  ${(props) => css.spaceMargins(props)};
`
export const WarningWrapper = styled(Wrapper)`
  background: ${theme('rainbow.orangeBg')};
  color: ${theme('rainbow.brown')};
`
export const DangerWrapper = styled(Wrapper)`
  background: ${theme('rainbow.redBg')};
  color: ${theme('rainbow.red')};
`
export const IconBox = styled.div`
  ${css.size(18)};
  ${css.row('align-both')};
`
export const InfoIcon = styled(InfoSVG)`
  ${css.size(15)};
  fill: ${theme('rainbow.brown')};
`
export const DangerIcon = styled(DangerSVG)`
  ${css.size(15)};
  fill: ${theme('rainbow.red')};
  margin-top: 1px;
  animation: ${animate.breath} 2s linear infinite alternate;
`
