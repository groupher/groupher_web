import Img from '~/Img'
import styled, { css, theme } from '~/css'

export const Wrapper = styled.div`
  ${css.row('align-center', 'justify-between')};
  margin-bottom: 8px;
`
export const Title = styled.div`
  /* ${css.row('align-center')}; */
  ${css.cutRest('200px')};
  color: ${theme('article.digest')};

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const Reaction = styled.div`
  ${css.row('align-center')};
  opacity: 0.8;

  ${Wrapper}:hover & {
    opacity: 1;
  }
  transition: all 0.2s;
`
export const Icon = styled(Img)`
  fill: ${theme('article.digest')};
  ${css.size(11)};
  margin-right: 3px;
  margin-top: -1px;
`
export const Count = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
`
