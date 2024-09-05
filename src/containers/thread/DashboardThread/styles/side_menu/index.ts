import useTwBelt from '~/hooks/useTwBelt'

import InfoSVG from '~/icons/Info'
import PulseSVG from '~/icons/Pulse'
import ManagementSVG from '~/icons/Management'
import BindSVG from '~/icons/Bind'

import styled, { css, theme } from '~/css'

export default () => {
  const { cn, fg } = useTwBelt()

  return {
    wrapper: cn('column w-40 min-w-40 pt-8', fg('text.digest')),
  }
}

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
