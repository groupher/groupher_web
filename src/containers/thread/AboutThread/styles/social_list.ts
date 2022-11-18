import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Img from '@/Img'

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`
export const SocialWrapper = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-top: 4px;
  margin-right: 16px;
  /* text-decoration: underline; */
  &:hover {
    color: ${theme('article.info')};
    cursor: pointer;
  }
`
export const Icon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  margin-right: 2px;

  ${SocialWrapper}:hover & {
    fill: ${theme('article.info')};
  }
`
export const Title = styled.div`
  font-size: 12px;
  margin-left: 3px;
  margin-top: 2px;
`
