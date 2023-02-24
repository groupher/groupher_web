import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Extra = styled.li`
  ${css.flex('align-center')};
  margin-top: 5px;
  margin-bottom: 4px;
  transition: opacity 0.2s;
  font-size: 13px;
  color: ${theme('article.info')};
`
export const UpvotesWrapper = styled.div`
  transform: scale(0.9);
`
export const BasicState = styled.div`
  ${css.flex('align-center')};
  gap: 0 10px;
  font-size: 12px;
  margin-top: 1px;
`
export const BodyDigest = styled.li`
  color: ${theme('article.digest')};
  white-space: normal;
  font-size: 12px;
  ${css.lineClamp(1)};
  max-width: 90%;
`
