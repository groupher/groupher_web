import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'
import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.row('align-end')};
  color: ${theme('banner.desc')};
`
export const TextWrapper = styled.div`
  ${css.row()};
  font-size: 0.9rem;
  align-items: baseline;
`
export const Text = styled.div``
export const Icon = styled(Img)<TActive>`
  fill: ${theme('banner.desc')};
  ${css.size(16)};
  margin-right: 3px;
  display: ${({ show }) => (show ? '' : 'none')};
`
export const Focus = styled.div`
  font-size: 1.1rem;
  color: ${theme('contrastFg')};
  margin-left: 3px;
  margin-right: 3px;
`
