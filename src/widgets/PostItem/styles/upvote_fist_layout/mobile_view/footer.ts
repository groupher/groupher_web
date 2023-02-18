import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div``

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
  font-size: 12px;
  color: ${theme('article.info')};
  margin-top: 2px;
`
export const BodyDigest = styled.li`
  color: ${theme('article.digest')};
  white-space: normal;
  display: block;
  font-size: 12px;
  max-width: 96%;
`
