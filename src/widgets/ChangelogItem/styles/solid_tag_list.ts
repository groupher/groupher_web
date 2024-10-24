import type { TColorName } from '~/spec'

import styled, { css, theme, rainbowSoft } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 8px;
  margin-left: -2px;

  ${css.media.mobile`
    gap: 6px;
  `};
`

export const TagWrapper = styled.div<{ color: TColorName }>`
  background: ${({ color }) => rainbowSoft(color)};
  padding: 2px 10px;
  border-radius: 10px;

  ${css.media.mobile`
    padding: 2px 6px;
  `};
`

export const Name = styled.div`
  color: ${theme('article.digest')};
  font-size: 11px;
  font-weight: 400;
`
