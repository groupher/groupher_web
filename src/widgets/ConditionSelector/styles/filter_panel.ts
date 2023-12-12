import styled, { css, theme, rainbow } from '@/css'
import type { TActive, TColor } from '@/spec'

import { SelectItem as SelectItemBase } from '.'

export const Wrapper = styled.div`
  ${css.column()};
  width: 110px;
  padding: 8px 10px;
  cursor: auto;
`
export const SelectItem = styled(SelectItemBase)`
  ${css.row('align-center')};
  padding: 7px 5px;
`
export const IconWrapper = styled.div`
  ${css.circle(16)};
  ${css.row('align-both')};

  opacity: 0.6;
  margin-right: 9px;
`

type TTitle = TColor & TActive
export const Title = styled.div<TTitle>`
  font-size: 14px;

  color: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  &:hover {
    color: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};
  }
`
