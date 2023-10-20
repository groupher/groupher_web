import styled from 'styled-components'

import ArrowSVG from '@/icons/Arrow'
import LinkSVG from '@/icons/Link'
import QRCodeSVG from '@/icons/menu/QRCode'
import WeiboSVG from '@/icons/social/WeiboRaw'
import MoreSVG from '@/icons/menu/More'
import SettingSVG from '@/icons/Setting'
import FlagSVG from '@/icons/Flag'

import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  height: 36px;
  margin-bottom: 20px;
  padding-left: 2px;
`
export const BackButton = styled.div`
  ${css.row('align-center')};
  padding: 2px 5px;
  margin-left: -2px;
  border: 1px solid;
  border-color: transparent;
  border-radius: 6px;

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  ${BackButton}:hover & {
    ${css.size(11)};
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
export const BackText = styled.div`
  color: ${theme('hint')};
  font-size: 13px;
  margin-left: 6px;
  opacity: 0;

  ${BackButton}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const LinkIcon = styled(LinkSVG)`
  ${css.size(22)};
  fill: ${theme('hint')};
  margin-left: 12px;
`
export const QRCodeIcon = styled(QRCodeSVG)`
  ${css.size(17)};
  fill: ${theme('hint')};
  margin-left: 14px;
`
export const WeiboIcon = styled(WeiboSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-top: -2px;
  margin-left: 16px;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-left: 16px;
`
export const FlagIcon = styled(FlagSVG)`
  ${css.size(18)};
  fill: ${theme('hint')};
  margin-left: 16px;
`
export const SettingIcon = styled(SettingSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-left: 16px;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
    fill: ${theme('article.title')};
  }

  transition: all 0.2s;
`
