import styled, { css, theme } from '~/css'
import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.column('align-center')};
  width: 100%;
  margin-top: 5%;
  margin-bottom: 30px;
`

export const ConstructIcon = styled(Img)`
  fill: ${theme('article.digest')};
  width: 300px;
  height: 300px;
`

export const Icon = styled.div``
export const Text = styled.div`
  text-align: center;
`

// border-bottom: 1px solid;
// border-bottom-color: ${theme('article.digest')}
export const Title = styled.div`
  color: ${theme('article.digest')};
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 1.4rem;
`

export const DescWrapper = styled.div`
  color: ${theme('article.digest')};
  margin-top: 0.6rem;
  font-size: 0.9rem;
`
export const IssueLink = styled.a`
  margin-left: 3px;
  text-decoration: none;
  color: ${theme('article.title')};
  transition: color 0.3s;
  text-decoration: underline;
  &:hover {
    font-weight: bolder;
    text-decoration: underline;
    color: ${theme('article.title')};
  }
`
