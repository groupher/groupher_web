import styled, { css, rainbow, theme } from '@/css'

import type { TActive, TColor } from '@/spec'
import HashTagSVG from '@/icons/HashTagBold'

export const Wrapper = styled.div`
  position: absolute;
  right: 25px;
  top: 56px;
  width: 80px;
  height: 250px;
  padding-top: 48px;
  /* border: 1px solid;
  border-color: ${theme('divider')}; */
`
type TTag = TColor & TActive
export const TagIcon = styled(HashTagSVG)<TTag>`
  ${css.size(11)};
  fill: ${({ $active, $color }) => ($active ? rainbow($color) : theme('article.digest'))};
  opacity: 0.6;
  transform: rotate(18deg);
  margin-right: 4px;
`
export const TagItem = styled.div<TActive>`
  ${css.row('align-center')};
  margin-bottom: 7px;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
`
export const TagTitle = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
