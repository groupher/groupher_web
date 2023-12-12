import type { TArticleTitle } from '@/spec'
import styled, { css, rainbow, rainbowLight, theme } from '@/css'
import DotDivider from '@/widgets/DotDivider'

import { Wrapper as ItemWrapper } from '.'

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
export const Title = styled.a<TArticleTitle>`
  ${css.row('align-center')};
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${({ $isPinned, $color }) => ($isPinned ? rainbow($color) : theme('article.title'))};
  filter: ${({ $isPinned }) => ($isPinned ? 'brightness(1.1)' : '')};

  &:before {
    content: '';
    position: absolute;
    display: ${({ $isPinned }) => ($isPinned ? 'block' : 'none')};
    left: 0;
    bottom: 4px;
    background: ${(props) => {
      const { $color } = props
      // @ts-ignore
      const colorVal = rainbowLight($color)(props)

      return `linear-gradient(180deg, transparent 30%, ${colorVal} 0)`
    }};
    opacity: 1;
    width: 30%;
    height: 10px;
    border-radius: 3px;
    z-index: -1;
  }

  @media (max-width: 1450px) {
    ${css.cutRest('500px')};
  }
  @media (max-width: 1250px) {
    ${css.cutRest('450px')};
  }
  @media (max-width: 1100px) {
    ${css.cutRest('350px')};
  }

  ${ItemWrapper}:hover & {
    text-decoration: underline;
    text-decoration-color: ${({ $isPinned, $color }) =>
      $isPinned ? rainbow($color) : theme('hint')};
  }

  &:hover {
    color: ${({ $isPinned, $color }) => ($isPinned ? rainbow($color) : theme('article.title'))};
    opacity: 0.8;
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

  &:hover {
    color: ${theme('article.digest')};
  }
`
export const PublishTime = styled.div`
  color: ${theme('hint')};
  font-size: 11px;
`
export const Dot = styled(DotDivider)`
  background-color: ${theme('article.digest')};
  margin-right: 8px;
`
