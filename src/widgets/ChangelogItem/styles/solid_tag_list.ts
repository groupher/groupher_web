import styled from 'styled-components'

import type { TColorName } from '@/spec'
import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
  margin-left: -2px;
  filter: saturate(0.6);
`

export const TagWrapper = styled.div<{ color: TColorName }>`
  background: ${({ color }) => theme(`baseColor.${color.toLowerCase()}Bg`)};
  padding: 1px 8px;
  border-radius: 10px;
`

export const Name = styled.div`
  color: ${({ color }) => theme(`baseColor.${color.toLowerCase()}`)};
  font-size: 12px;
  font-weight: 500;
`
