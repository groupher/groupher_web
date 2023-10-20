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

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(18)};
    fill: ${theme('hint')};
    opacity: 0.65;
    margin-left: 15px;
    cursor: pointer;

    &:hover {
      fill: ${theme('article.title')};
      opacity: 1;
    }

    transition: all 0.2s;
  `
}

export const Icon = {
  Link: styled(commonIcon(LinkSVG))`
    ${css.size(22)};
  `,
  More: commonIcon(MoreSVG),
  QRCode: commonIcon(QRCodeSVG),
}
