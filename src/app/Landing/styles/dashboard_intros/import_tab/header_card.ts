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
  top: 20px;
  left: 0;
`
export const Card = styled.div`
  ${css.size(88)};
  ${css.column('align-both')};
  gap: 5px 0;
  background: ${theme('htmlBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding-top: 5px;
`
export const ImgIcon = styled(Img)`
  ${css.size(28)}};
  border-radius: 5px;
`
export const Title = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  font-size: 14px;
  margin-top: 5px;
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
