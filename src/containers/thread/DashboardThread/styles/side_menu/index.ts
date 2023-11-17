import styled from 'styled-components'

import type { TTestable } from '@/spec'

import InfoSVG from '@/icons/Info'
import PulseSVG from '@/icons/Pulse'
import ManagementSVG from '@/icons/Management'
import BindSVG from '@/icons/Bind'

import css, { theme } from '@/css'

export const Wrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column()};
  width: 168px;
  min-width: 168px;
  color: ${theme('article.digest')};
  padding-top: 32px;

  ${css.media.mobile`
    display: none;
  `};
`

export const MobileWrapper = styled.div.attrs<TTestable>(({ $testid }) => ({
  'data-test-id': $testid,
}))<TTestable>`
  ${css.column()};
  width: 175px;
  min-width: 175px;
  color: ${theme('article.digest')};
  padding-top: 15px;
  padding-left: 15px;
`

export const Folder = styled.div`
  ${css.row('align-center')};
  margin-bottom: 13px;
`
const BasicIcon = styled(InfoSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
`
const PulseIcon = styled(PulseSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
`
const ManagementIcon = styled(ManagementSVG)`
  ${css.size(18)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: -2px;
`
const BindIcon = styled(BindSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  opacity: 0.8;
`

export const Icon = {
  Basic: BasicIcon,
  Analysis: PulseIcon,
  Management: ManagementIcon,
  Bind: BindIcon,
}
