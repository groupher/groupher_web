import styled from 'styled-components'

import LinkSVG from '@/icons/Link'
import QRCodeSVG from '@/icons/QRCodeSolid'
import MoreSVG from '@/icons/ShareArrow'

import { WithMargin } from '@/widgets/Common'

import css, { theme } from '@/css'

export const Wrapper = styled(WithMargin)`
  ${css.row('align-center')};
`
export const Panel = styled.div`
  padding: 6px;
`
export const TipNote = styled.div`
  font-size: 11px;
  color: ${theme('hint')};
  margin-top: 5px;
`
export const QRTip = styled(TipNote)`
  max-width: 120px;
`
export const LinkTip = styled(TipNote)`
  margin-top: 0;
  font-size: 12px;
`

export const LinkIcon = styled(LinkSVG)`
  ${css.size(22)};
  fill: ${theme('hint')};
  margin-left: 12px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.title')};
  }

  &:active {
    transform: scale(0.85);
  }
  transition: all 0.2s;
`
export const QRCodeIcon = styled(QRCodeSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-left: 14px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.title')};
  }
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-left: 16px;
  cursor: pointer;

  &:hover {
    fill: ${theme('article.title')};
  }
`
