import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
  height: 48px;
  margin-bottom: 5px;
`
export const AuthorWrapper = styled.div`
  ${css.row('align-center')};
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
  ${css.row('align-center')}
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
