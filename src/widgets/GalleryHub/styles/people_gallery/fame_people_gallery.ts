import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

import { Block as BlockBase, Footer as FooterBase } from '.'

export const Wrapper = styled.div`
  ${css.row()};
  flex-wrap: wrap;
  color: ${theme('article.digest')};
  width: 100%;
`
export const Block = styled(BlockBase)`
  width: 33%;
  height: 260px;
`
export const Body = styled.div`
  ${css.row('align-center')};
  &:hover {
    cursor: pointer;
  }
`
export const Avatar = styled(Img)`
  ${css.circle(60)};
  object-fit: cover;
`
export const Intro = styled.div`
  ${css.column()};
  margin-left: 14px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  cursor: pointer;
  ${css.cutRest('200px')};
`
export const AKA = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
`
export const Birthday = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};
`
export const Digest = styled.div`
  ${css.lineClamp(3)}
  color: ${theme('article.digest')};
  font-size: 14px;
  opacity: 0.9;
  margin-top: 20px;
  cursor: pointer;

  ${Block}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }
  transition: all 0.2s;
`
export const Footer = styled(FooterBase)`
  opacity: 0.8;

  ${Block}:hover & {
    opacity: 1;
  }
`

export const CommentWrapper = styled.div`
  margin-bottom: 3px;
`
