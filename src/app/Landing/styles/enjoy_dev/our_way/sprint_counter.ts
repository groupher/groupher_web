import styled, { css, theme } from '~/css'

import SprintSVG from '~/icons/Sprint'

export const Wrapper = styled.div<{ color: string }>`
  ${css.row('align-center')};
`
export const SprintIcon = styled(SprintSVG)`
  ${css.size(14)};
  fill: ${theme('hint')};
`
export const Text = styled.div<{ color: string }>`
  color: ${({ color }) => color || theme('article.title')};
  font-size: 13px;
  margin-left: 4px;
`
