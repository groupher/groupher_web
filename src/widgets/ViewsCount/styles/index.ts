import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import ViewedSVG from '@/icons/article/Viewed'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.info')};
  font-size: 13px;
`
export const HighlightWrapper = styled(Wrapper)`
  font-weight: 500;
  background: ${theme('heightGradient')};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`
export const ViewsIcon = styled(ViewedSVG)<{ highlight?: boolean }>`
  fill: ${({ highlight }) =>
    highlight ? theme('heightIcon') : theme('article.info')};
  ${css.size(11)};
  margin-right: 5px;
  margin-top: -1px;
`
