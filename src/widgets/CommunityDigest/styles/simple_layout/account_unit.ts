import styled from 'styled-components'

import type { TAvatarLayout } from '@/spec'
import { AVATAR_LAYOUT } from '@/constant/layout'

import css, { theme } from '@/css'
import Link from 'next/link'

import Button from '@/widgets/Buttons/Button'
import Img from '@/Img'
import NotifySVG from '@/icons/Notify'
import DashboardSVG from '@/icons/Dashboard'
import AccountSVG from '@/icons/Acount'

import GithubSVG from '@/icons/Github8'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  color: ${theme('article.digest')};
  margin-bottom: 1px;

  ${css.media.mobile`
    margin-right: 0;
  `};
`
export const Avatar = styled(Img)<{ avatarLayout: TAvatarLayout }>`
  ${css.size(18)};
  border-radius: ${({ avatarLayout }) => (avatarLayout === AVATAR_LAYOUT.SQUARE ? '6px' : '100%')};

  ${css.row('justify-between')};
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
`

export const GithubItem = styled(Link)`
  ${css.row('align-center')};
  text-decoration: none;
  gap: 0 8px;
  font-size: 14px;
  margin-right: 25px;
  color: ${theme('article.title')};
  opacity: 0.6;

  img {
    transform: scale(1.15);
  }

  &:hover {
    text-decoration: none;
    opacity: 0.85;
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const GithubIcon = styled(GithubSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
`

export const DashboardIcon = styled(DashboardSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 5px;

  ${hoverEffect}

  ${css.media.mobile`
    display: none;
  `};
`

export const DashboardLink = styled(Link)`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  text-decoration: none;
  margin-right: 16px;
  font-weight: 400;
  font-size: 14px;
  ${hoverEffect}

  &:hover {
    text-decoration: none;
    color: ${theme('article.title')};
  }
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
