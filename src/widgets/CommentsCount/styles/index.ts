import styled from 'styled-components'

import type { TSizeSM } from '@/spec'
import SIZE from '@/constant/size'

import css, { theme } from '@/utils/css'

import CommentSVG from '@/icons/Comment'

export const Wrapper = styled.div<{ size: TSizeSM }>`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: ${({ size }) => (size === SIZE.MEDIUM ? '14px' : '13px')};
  font-weight: 500;
  line-height: 19px;
`
export const HighlightWrapper = styled(Wrapper)`
  background: ${theme('heightGradient')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
type TCommentsIcon = { highlight?: boolean; size: TSizeSM }
export const CommentsIcon = styled(CommentSVG)<TCommentsIcon>`
  fill: ${({ highlight }) => (highlight ? theme('heightIcon') : theme('article.info'))};
  ${({ size }) => (size === SIZE.MEDIUM ? css.size(11) : css.size(10))};
  margin-right: 3px;
  margin-top: 2px;
`
export const Count = styled.div``
