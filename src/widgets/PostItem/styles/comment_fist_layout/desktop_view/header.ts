import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import LinkSVG from '@/icons/Link'

export const Wrapper = styled.div`
  ${css.flex()};
  margin-top: 2px;
`
export const Brief = styled.div`
  ${css.flexGrow('align-center')};
  margin-bottom: 7px;
  margin-left: 10px;
  color: ${theme('article.title')};
`
export const Title = styled.a`
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
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
export const LinkIcon = styled(LinkSVG)`
  fill: ${theme('article.link')};
  position: absolute;
  top: 6px;
  left: -5px;
  ${css.size(12)};
`

export const AvatarsWrapper = styled.div`
  margin-top: -1px;
  margin-right: -8px;
`
