import styled, { css, theme } from '@/css'

import Button from '@/widgets/Buttons/Button'
import Img from '@/Img'
import NotifySVG from '@/icons/Notify'
import DashboardSVG from '@/icons/Dashboard'
import SearchSVG from '@/icons/HeaderSearch'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  margin-right: 10px;
  margin-top: 15px;
  font-weight: 600;
`
export const Avatar = styled(Img)`
  ${css.circle(20)};
  ${css.row('justify-between')};
`
export const SubscribeButton = styled(Button)`
  margin-right: 18px;
  border-radius: 10px;
  padding: 0 12px;
`
export const SubText = styled.div`
  font-size: 12px;
`
export const NotifyIcon = styled(NotifySVG)`
  fill: ${theme('article.digest')};
  /* fill: #e9eaea; */
  ${css.size(20)};
  margin-right: 15px;
  opacity: 0.8;
`
export const DashboardIcon = styled(DashboardSVG)`
  fill: ${theme('article.digest')};
  /* fill: #e9eaea; */
  ${css.size(20)};
  margin-right: 14px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`
export const SearchIcon = styled(SearchSVG)`
  fill: ${theme('article.digest')};
  ${css.size(20)};
  margin-right: 14px;
  opacity: 0.8;
`
