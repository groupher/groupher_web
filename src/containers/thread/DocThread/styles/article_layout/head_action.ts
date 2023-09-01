import styled from 'styled-components'

import css, { theme } from '@/css'

import ShareSVG from '@/icons/Share'
import ReportSVG from '@/icons/WarningLight'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  padding: 0 6px;
  gap: 0 12px;
`
export const ShareIcon = styled(ShareSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`

export const ReportIcon = styled(ReportSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`

export const Holder = styled.div``
