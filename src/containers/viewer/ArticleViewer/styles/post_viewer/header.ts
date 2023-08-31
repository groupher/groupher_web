import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  width: 100%;
  height: 60px;
`
export const AuthorWrapper = styled.div`
  ${css.flex('align-center')};
`
export const Avatar = styled(Img)`
  ${css.circle(18)};
  margin-right: 10px;
`
export const AuthorName = styled.div`
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.8;
`
export const PublishWrapper = styled.div`
  ${css.flex('align-center')}
`
export const PubDate = styled.div`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 13px;
`
export const EditedHint = styled.div`
  font-size: 13px;
  color: ${theme('article.info')};

  &:before {
    content: '(';
  }
  &:after {
    content: ')';
  }
`
