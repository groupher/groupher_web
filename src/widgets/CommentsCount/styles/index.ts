import styled from 'styled-components'

import type { TSizeSM } from '@/spec'
import { SIZE } from '@/constant'

import css, { theme } from '@/utils/css'

import CommentSVG from '@/icons/Comment'

export const Wrapper = styled.div<{ size: TSizeSM }>`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: ${({ size }) => (size === SIZE.MEDIUM ? '14px' : '13px')};
  font-weight: 500;
`
export const HighlightWrapper = styled(Wrapper)`
  background: ${theme('heightGradient')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
type TCommentsIcon = { highlight?: boolean }
export const CommentsIcon = styled(CommentSVG)<TCommentsIcon>`
  fill: ${({ highlight }) =>
    highlight ? theme('heightIcon') : theme('article.info')};
  ${css.size(11)};
  margin-right: 4px;
`
export const Count = styled.div`
  margin-top: -1px;
`
