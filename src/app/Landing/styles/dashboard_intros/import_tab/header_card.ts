import styled, { css, theme } from '@/css'

import type { TActive } from '@/spec'

import Img from '@/Img'
import MarkdownSVG from '@/icons/Markdown'
import EmailSVG from '@/icons/social/Email'
import WeChatSVG from '@/icons/social/WeChat'
import GithubSVG from '@/icons/social/Github'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  padding: 0 15px;
  padding-bottom: 0;
  color: ${theme('article.digest')};
  width: 100%;
  height: 56px;
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0;
`
export const ImCard = styled.div`
  width: 240px;
  height: 60px;
  ${css.column('align-both')};
  background: ${theme('htmlBg')};
  gap: 12px 0px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding-top: 5px;
`
export const OhterCard = styled(ImCard)`
  width: 134px;
  height: 55px;
  margin-left: 30px;
`
export const ImIcons = styled.div`
  width: 100%;
  ${css.row('align-both')};
  opacity: 0.9;
  gap: 0 15px;
`
export const ToolIcons = styled(ImIcons)`
  gap: 0 22px;
`
export const FooterNote = styled.div`
  color: ${theme('article.digest')};
  font-size: 13px;
  margin-bottom: -5px;
`
export const ImgIcon = styled(Img)<{ $size?: number }>`
  ${({ $size }) => css.size($size || 28)}};
`
export const MDIcon = styled(Img)`
  margin-top: 1px;
  width: 28px;
  height: 20px;
`
export const CVSIcon = styled(Img)`
  width: 24px;
  height: 28px;
`

const commonIcon = (SVG, size = 28) => {
  return styled(SVG)<TActive>`
    ${css.size(size)};

    &:hover {
      cursor: pointer;
    }

    transition: all 0.2s;
  `
}

export const Icon = {
  Markdown: commonIcon(MarkdownSVG),
  EMAIL: commonIcon(EmailSVG),
  GITHUB: commonIcon(GithubSVG),
  WECHAT: commonIcon(WeChatSVG),
}
