import styled from 'styled-components'

import css, { theme } from '@/css'

import Input from '@/widgets/Input'
import SearchSVG from '@/icons/HeaderSearch'
import CloseSVG from '@/icons/CloseCross'
import FilterSVG from '@/icons/FilterList'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  position: relative;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 6px;
  margin-right: -8px;

  &:hover {
    background: ${theme('hoverBg')};
  }
`
export const Back = styled.div`
  ${css.flex('align-both')};
  width: 70px;
  margin-right: 10px;
  padding-right: 8px;

  ${css.media.mobile`
    width: 68px;
    margin-right: 0;
    margin-left: -5px
  `};
`
export const InputWrapper = styled(Wrapper)`
  cursor: default;
  padding-left: 2px;
  width: 100%;
`
export const Inputer = styled(Input)`
  cursor: text;
  width: 100%;
  padding-left: 30px;
  padding-bottom: 5px;

  ${css.media.mobile`
    padding-left: 10px;
  `};
`
export const SearchIcon = styled(SearchSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  z-index: 1;
  margin-right: 8px;
  margin-top: -1px;
  opacity: 0.6;

  ${css.media.mobile`
    margin-right: 1px;
    opacity: 0.8;
  `};
`
export const InputSearchIcon = styled(SearchIcon)`
  position: absolute;
  left: 85px;
  top: 10px;

  margin-right: 0;
  margin-top: 0;

  ${css.media.mobile`
    display: none;
  `};
`
export const ClearIcon = styled(CloseSVG)`
  ${css.size(15)};
  position: absolute;
  right: 45px;
  top: 10px;
  fill: ${theme('article.digest')};
  opacity: 0.3;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${css.media.mobile`
    right: 40px;
  `};

  transition: all 0.2s;
`
export const FilterIcon = styled(FilterSVG)`
  ${css.size(20)};
  fill: ${theme('article.title')};
  margin-left: 18px;
  opacity: 1;
  cursor: pointer;

  ${css.media.mobile`
    ${css.size(25)};
    margin-left: 10px;
  `};
`
export const Text = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  font-weight: 400;
  opacity: 0.8;
  word-break: keep-all;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    opacity: 0.8;
  }

  ${css.media.mobile`
    display: none;
  `};
`
