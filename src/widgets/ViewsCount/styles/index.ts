import styled from 'styled-components'

import css, { theme } from '@/css'

import ViewedSVG from '@/icons/article/Viewed'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  color: ${theme('article.digest')};
  opacity: 0.85;
  line-height: 22px;
  margin-top: -1px;
`
export const HighlightWrapper = styled(Wrapper)`
  font-weight: 500;
  background: ${theme('heightGradient')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const Count = styled.div`
  font-size: 13px;
`
export const ViewsIcon = styled(ViewedSVG)<{ $highlight?: boolean }>`
  fill: ${({ $highlight }) => ($highlight ? theme('heightIcon') : theme('article.digest'))};
  ${css.size(12)};
  margin-top: 1px;
  margin-right: ${({ $highlight }) => ($highlight ? '4px' : '6px')};
  opacity: 0.85;
`
