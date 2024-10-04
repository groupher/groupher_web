import styled, { css, theme } from '~/css'

import ArrowSVG from '~/icons/Arrow'
import FilterSVG from '~/icons/Filter'

export const Wrapper = styled.div`
  // ${css.column()};
  width: calc(100% + 50px);
  margin-left: -30px;
`
export const Title = styled.span`
  font-size: 13px;
  color: ${theme('article.title')};
  font-weight: 500;
`

const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(9)};
  transform: rotate(90deg);
  margin-left: 4px;
  margin-top: 1px;
`

const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`

const FilterIcon = styled(FilterSVG)`
  ${css.size(9)};
  margin-left: 4px;
`

export const SortIcon = {
  ArrowUp: ArrowUpIcon,
  ArrowDown: ArrowDownIcon,
  Filter: FilterIcon,
}
