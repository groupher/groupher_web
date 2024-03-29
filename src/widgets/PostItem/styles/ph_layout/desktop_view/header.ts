import styled, { css, theme } from '@/css'
import LinkSVG from '@/icons/Link'

import { Wrapper as ItemWrapper } from '.'

export const Wrapper = styled.div`
  ${css.row()};
  margin-top: 2px;
`
export const Brief = styled.div`
  ${css.rowGrow('align-center')};
  margin-bottom: 7px;
  margin-left: 10px;
  color: ${theme('article.title')};
`
export const Title = styled.a`
  ${css.cutRest('350px')};
  position: relative;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.03em;
  opacity: 0.85;
  color: ${theme('article.title')};

  ${ItemWrapper}:hover & {
    text-decoration: underline;
    text-decoration-color: ${theme('hint')};
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
