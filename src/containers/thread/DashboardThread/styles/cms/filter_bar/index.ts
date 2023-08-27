import styled from 'styled-components'

import css, { theme } from '@/css'

import Input from '@/widgets/Input'

import SearchSVG from '@/icons/HeaderSearch'
import ResetSVG from '@/icons/Reset'
import DubbleCheckSVG from '@/icons/DubbleCheck'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 52px;
  padding-right: 5px;
  margin-left: 5px;
  margin-top: 1px;
  padding-bottom: 15px;
  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const MainWrapper = styled.div`
  ${css.flex('align-center')};
  width: 100%;
`
export const InputerWrapper = styled.div`
  position: relative;
  width: 200px;
  margin-right: 36px;
`
export const Inputer = styled(Input)`
  height: 26px;
  padding-left: 30px;

  ::placeholder {
    font-size: 12px;
  }
`
export const SearchIcon = styled(SearchSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 2;
`
export const DubbleCheckIcon = styled(DubbleCheckSVG)`
  ${css.size(15)};
  margin-right: 4px;
  fill: ${theme('article.digest')};
`
export const ResetIcon = styled(ResetSVG)`
  ${css.size(12)};
  margin-right: 4px;
  fill: ${theme('article.digest')};
`

export const DateRangeWrapper = styled.span`
  font-size: 13px;
`
