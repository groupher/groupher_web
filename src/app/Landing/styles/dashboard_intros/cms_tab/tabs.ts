import styled, { css, theme } from '~/css'

import TimeSVG from '~/icons/TimelineMode'
import FilterSVG from '~/icons/FilterSolid'

import { Icon } from './menu_card'

export const Wrapper = styled.div`
  ${css.column()};
  z-index: 1;
  position: absolute;
  top: 120px;
  left: 130px;
`
const Item = styled.div`
  position: absolute;
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  border: 2px solid;
  border-color: ${theme('htmlBg')};
  border-radius: 15px;
  background: ${theme('htmlBg')};
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  height: 42px;
  font-size: 13px;
`
export const PostItem = styled.div`
  /*  can not re-use Item styles here cause styled-components bug */
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  border: 3px solid;
  border-color: ${theme('htmlBg')};
  border-radius: 15px;
  background: ${theme('htmlBg')};
  box-shadow: rgba(149, 157, 165, 0.4) 0px 8px 24px;
  width: 100px;
  height: 42px;
  padding-bottom: 8px;
  font-size: 13px;
  z-index: 9;

  background: ${theme('gradientBg.blue')};
  font-weight: 500;
  border-radius: 13px;
  position: absolute;
  top: -8px;
  height: 48px;
  z-index: 10;
`
export const KanbanItem = styled(Item)`
  width: 100px;
  left: 100px;
  top: -3px;
  width: 80px;
  z-index: 8;
  height: 45px;
  padding-bottom: 11px;
  border-radius: 10px;
  /* background: ${theme('gradientBg.purple')}; */
`
export const ChangelogItem = styled(Item)`
  width: 100px;
  left: 175px;
  top: -1px;
  z-index: 7;
  padding-bottom: 8px;
  /* background: ${theme('gradientBg.pink')}; */
`
export const DocItem = styled(Item)`
  width: 90px;
  left: 260px;
  z-index: 6;
  height: 40px;
  top: 2px;
  padding-bottom: 12px;
  padding-left: 5px;
  /* background: ${theme('gradientBg.green')}; */
`
export const UserItem = styled(Item)`
  left: 340px;
  z-index: 5;
  height: 40px;
  width: 80px;
  top: 6px;
  padding-bottom: 16px;
  padding-left: 5px;
  /* background: ${theme('gradientBg.orange')}; */
`
export const BottomItem = styled(Item)`
  ${css.row('align-center')};
  border: 3px solid;
  border-color: ${theme('htmlBg')};
  left: 50px;
  top: 474px;
  z-index: 5;
  height: 40px;
  width: 320px;
  padding: 0 12px;
  padding-left: 8px;
  padding-top: 6px;
  border-radius: 8px;
  background: ${theme('gradientBg.black')};
  opacity: 0.8;
`
export const FilterBox = styled.div`
  ${css.size(16)};
  ${css.row('align-both')};
  border-radius: 4px;
  // background: #8cc5e7;
  background: ${theme('divider')};
  margin-right: 10px;
  border: 1px solid;
  border-color: ${theme('article.digest')};
`
export const FilterIcon = styled(FilterSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
`
export const TimeIcon = styled(TimeSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
  margin-right: 7px;
`
export const FilterTitle = styled.div`
  color: ${theme('article.title')};
  font-size: 12px;
  font-weight: 400;
`
export const CatIcon = styled(Icon.Category)`
  opacity: 0.8;
  margin-top: 0;
`
export const StateIcon = styled(Icon.State)`
  opacity: 0.6;
  margin-top: -1px;
`
