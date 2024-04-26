import styled, { css, theme } from '@/css'

// import type { TActive } from '@/spec'

import FirefoxSVG from '@/icons/Firefox'
import ChromeWebStoreSVG from '@/icons/ChromeWebStore'
import GooglePlaySVG from '@/icons/GooglePlay'
import AppStoreSVG from '@/icons/AppStore'
import GithubSVG from '@/icons/social/Github'

import LinkSVG from '@/icons/ArrowUpRight'

export const Wrapper = styled.div`
  padding: 10px 8px;
  width: 200px;
`
export const MenuBar = styled.div`
  ${css.row('align-center')};
  gap: 0 8px;
  color: ${theme('article.digest')};
  font-size: 14px;
  height: 58px;
  width: 100%;
  padding: 2px 12px;
  padding-right: 8px;
  border: 1px solid;
  border-color: transparent;
  border-radius: 6px;

  &:hover {
    color: ${theme('article.title')};
    background: ${theme('menuHoverBg')};
    box-shadow: ${theme('shadow.xl')};
    border-color: ${theme('divider')};
    cursor: pointer;
  }
`
export const AppStoreBar = styled.div`
  ${css.row('align-center')};
  height: 60px;
  margin-left: 10px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
    box-shadow: ${theme('shadow.xl')};
    cursor: pointer;
  }
`
export const Info = styled.div`
  ${css.column()};
  margin-left: 6px;
`
export const Platform = styled.div`
  font-size: 12px;
  color: ${theme('hint')};
`
export const Title = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  font-weight: 400;
  margin-top: -2px;
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(25)};
    cursor: pointer;
  `
}

export const ICON = {
  Firefox: commonIcon(FirefoxSVG),
  ChromeWebStore: styled(commonIcon(ChromeWebStoreSVG))`
    ${css.size(30)};
  `,
  GooglePlay: styled(commonIcon(GooglePlaySVG))`
    width: 160px;
    height: auto;
  `,
  AppStore: styled(commonIcon(AppStoreSVG))`
    width: 160px;
    height: auto;
  `,
  Github: commonIcon(GithubSVG),

  Link: styled(commonIcon(LinkSVG))`
    ${css.size(14)};
    opacity: 0;
    ${MenuBar}:hover & {
      opacity: 0.8;
    }
  `,
}
