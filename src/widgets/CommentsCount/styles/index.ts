import styled from 'styled-components'

import type { TSizeSM, TSpace } from '@/spec'
import SIZE from '@/constant/size'

import css, { theme } from '@/css'

import CommentSVG from '@/icons/Comment'

type TWrapper = { size: TSizeSM } & TSpace
export const Wrapper = styled.div<TWrapper>`
  ${css.row('align-center')};
  color: ${theme('article.info')};
  font-size: ${({ size }) => (size === SIZE.MEDIUM ? '14px' : '13px')};
  font-weight: 500;
  line-height: 19px;

  ${(props) => css.spaceMargins(props)};
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
  opacity: 0.7;
`
export const Count = styled.div``
