import styled, { css, theme } from '@/css'

import DownloadSVG from '@/icons/DownloadCircle'

export const Wrapper = styled.div`
  ${css.size(22)};
  ${css.row('align-both')};
  border-radius: 3px;

  svg {
   /* to aoid pointer status like hover conflict */
    pointer-events: none;
  }

  &:hover {
    background: ${theme('hoverBg')};
    cursor: pointer;
  }
`
export const DownloadIcon = styled(DownloadSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-right: 1px;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
    cursor: pointer;
  }
`
