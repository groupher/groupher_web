import styled from 'styled-components'

import type { TSizeSM, TSpace } from '@/spec'
import SIZE from '@/constant/size'

import css, { theme } from '@/utils/css'

import CommentSVG from '@/icons/Comment'

type TWrapper = { size: TSizeSM } & TSpace
export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: ${({ size }) => (size === SIZE.MEDIUM ? '14px' : '13px')};
  font-weight: 500;
  line-height: 19px;

  margin-top: ${({ top }) => `${top}px` || 0};
  margin-bottom: ${({ bottom }) => `${bottom}px` || 0};
  margin-left: ${({ left }) => `${left}px` || 0};
  margin-right: ${({ right }) => `${right}px` || 0};
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
  margin-right: 4px;
  margin-top: 2px;
`
export const Count = styled.div``
