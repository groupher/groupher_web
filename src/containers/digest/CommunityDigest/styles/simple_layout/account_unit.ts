import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Button from '@/widgets/Buttons/Button'
import Img from '@/Img'
import NotifySVG from '@/icons/Notify'
import DashboardSVG from '@/icons/Dashboard'
import AccountSVG from '@/icons/Acount'

export const Wrapper = styled.div`
  ${css.flex('align-both')};
  color: ${theme('article.digest')};
  margin-right: 14px;
  font-weight: 600;
  margin-top: 0;

  ${css.media.mobile`
    margin-right: 0;
  `};
`
export const Avatar = styled(Img)`
  ${css.circle(24)};
  ${css.flex('justify-between')};
`
export const SubscribeButton = styled(Button)`
  margin-right: 18px;
  border-radius: 10px;
  padding: 0 12px;
`

const hoverEffect = `
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
  transition: all 0.2s;
`

export const NotifyIcon = styled(NotifySVG)`
  fill: ${theme('article.digest')};
  ${css.size(16)};
  margin-right: 18px;

  ${hoverEffect}
`
export const DashboardIcon = styled(DashboardSVG)`
  fill: ${theme('article.digest')};
  ${css.size(15)};
  margin-right: 16px;

  ${hoverEffect}

  ${css.media.mobile`
    display: none;
  `};
`
export const AccountIcon = styled(AccountSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 14px;

  ${hoverEffect}

  ${css.media.mobile`
    margin-right: 0;
  `};
`
