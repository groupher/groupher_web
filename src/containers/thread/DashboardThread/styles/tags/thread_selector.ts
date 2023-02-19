import styled from 'styled-components'

import css, { theme } from '@/utils/css'

export const Wrapper = styled.div`
  ${css.flex()};
  padding-right: 30px;
  width: 100%;
  margin-bottom: 20px;

  ${css.media.mobile`
    padding-right: 0;
  `};
`
export const Hint = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-top: 3px;
  width: 70px;
  min-width: 70px;
`
export const CatsWrapper = styled.div`
  ${css.flex('align-center')};
  flex-wrap: wrap;
  margin-left: 15px;
  gap: 14px;

  ${css.media.mobile`
    margin-left: 0;
    gap: 6px;
  `};
`
