import styled, { css, theme } from '~/css'

import type { TActive } from '~/spec'
import CheckSVG from '~/icons/CheckBold'

export const Wrapper = styled.div`
  ${css.rowWrap()};
  margin-top: 50px;
  padding-left: 12px;
  width: 100%;
  height: 100%;
  z-index: 3;
`
type TItem = { $wider?: boolean } & TActive
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  gap: 0 8px;
  width: ${({ $wider }) => ($wider ? '58%' : '42%')};
  height: 20px;
  opacity: ${({ $active }) => ($active ? 1 : 0.5)};

  transition: all 0.2s;
`
export const HolderItem = styled(Item)`
  ${css.row('align-center')};
`
export const HolderBar = styled.div<TActive>`
  width: 45%;
  height: 8px;
  background: ${theme('rainbow.red')};
  border-radius: 5px;
  opacity: ${({ $active }) => ($active ? 4 : 0.2)};
  margin-left: 2px;
`
export const CheckIcon = styled(CheckSVG)<TActive>`
  ${css.size(14)};
  fill: ${theme('rainbow.pink')};
  opacity: ${({ $active }) => ($active ? 1 : 0.3)};
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
`
