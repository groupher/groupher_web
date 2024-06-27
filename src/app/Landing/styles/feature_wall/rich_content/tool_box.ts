import type { TActive } from '~/spec'
import styled, { css, theme } from '~/css'

import QuoteSVG from '~/icons/editor/Quote'
import ImageSVG from '~/icons/editor/Image'
import TableSVG from '~/icons/editor/Table'
import TitleSVG from '~/icons/editor/Title'
import CodeSVG from '~/icons/editor/Code'
import VideoVG from '~/icons/social/BiliBili'

export const Wrapper = styled.div<{ $hovering: boolean }>`
  position: absolute;

  right: ${({ $hovering }) => ($hovering ? '-15px' : '-5px')};
  top: ${({ $hovering }) => ($hovering ? '28px' : '45px')};

  width: 100px;
  height: 142px;
  padding: 0 5px;
  padding-top: 3px;
  background: ${theme('landing.greyBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgb(96 96 96 / 9%) 0px 2px 16px 0px;
  border-radius: 6px;
  z-index: 10;

  transition: all 0.2s;
`

type TItem = TActive & { $opacity?: number }
export const Item = styled.div<TItem>`
  ${css.row('align-center')};
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  border: ${({ $active }) => ($active ? '1px solid' : 'none')};
  border-color: ${({ $active }) => ($active ? theme('divider') : '')};
  opacity: ${({ $opacity }) => $opacity || 1};
  padding: 2px 8px;
  border-radius: 3px;
  margin-top: 1px;
`
export const IconWrapper = styled.div`
  ${css.size(11)};
  margin-right: 4px;
  ${css.row('align-both')};
`

const commonIcon = (comp) => {
  return styled(comp)`
    ${css.size(12)};
    fill: ${theme('article.digest')};
  `
}

export const Icon = {
  Code: commonIcon(CodeSVG),
  Title: commonIcon(TitleSVG),
  Table: commonIcon(TableSVG),
  Quote: commonIcon(QuoteSVG),
  Image: commonIcon(ImageSVG),
  Video: styled(commonIcon(VideoVG))`
    ${css.size(9)};
    margin-left: -1px;
  `,
}

export const Title = styled.div<TActive>`
  font-size: 11px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
`
