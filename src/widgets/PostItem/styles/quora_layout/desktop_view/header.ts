import Link from 'next/link'
import styled from 'styled-components'

import css, { theme } from '@/css'
import DotDivider from '@/widgets/DotDivider'

export const Wrapper = styled.div`
  ${css.column()};
`
export const Topping = styled.div`
  ${css.row('align-center')};
  margin-bottom: 4px;
`
export const Main = styled.div`
  ${css.rowGrow('align-center')};
  color: ${theme('article.title')};
`
export const Title = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${theme('article.title')};

  @media (max-width: 1450px) {
    ${css.cutRest('500px')};
  }
  @media (max-width: 1250px) {
    ${css.cutRest('450px')};
  }
  @media (max-width: 1100px) {
    ${css.cutRest('350px')};
  }

  &:hover {
    color: ${theme('article.digest')};
    cursor: pointer;
  }

  transition: color 0.2s;
`
export const TitlePopInfo = styled.div`
  padding: 4px 8px;
`
export const TitleLink = styled.div`
  position: relative;
  font-size: 15px;
  margin-top: -1px;
  color: ${theme('article.link')};
  margin-left: 10px;
  opacity: 0.8;
  text-decoration: underline;
`

export const AuthorName = styled.div`
  display: block;
  color: ${theme('hint')};
  font-size: 13px;
`
export const PublishTime = styled.div`
  color: ${theme('hint')};
  font-size: 11px;
`
export const Dot = styled(DotDivider)`
  background-color: ${theme('article.digest')};
  margin-right: 8px;
`
