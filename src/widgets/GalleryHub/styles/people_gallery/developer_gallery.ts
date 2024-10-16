import Img from '~/Img'
import styled, { css, theme } from '~/css'

import { Block as BlockBase, Footer as FooterBase } from '.'

export const Wrapper = styled.div`
  ${css.rowWrap()};
  color: ${theme('article.digest')};
  width: 100%;
`
export const Block = styled(BlockBase)`
  width: 25%;
  height: 308px;
`
export const Header = styled.div`
  ${css.column()};
`
export const Body = styled.div`
  ${css.columnGrow('align-both')};
  cursor: pointer;
`
export const Avatar = styled(Img)`
  ${css.circle(58)};
`
export const Intro = styled.div`
  ${css.column('align-both')};
  margin-top: 15px;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 18px;
  cursor: pointer;
`
export const Digest = styled.div`
  color: ${theme('article.digest')};
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  height: 65px;
  opacity: 0.9;
  cursor: pointer;

  ${Block}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }
  transition: all 0.2s;
`
export const SocialWrapper = styled.div`
  margin-top: 8px;
  opacity: 0;
  border-top: 1px solid #004352;

  ${Block}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }
  transition: all 0.2s;
`
export const WorksWrapper = styled.div`
  ${css.row('align-center')}
`
export const WorkIcon = styled(Img)`
  ${css.circle(16)};
  margin-right: 5px;
  filter: saturate(0.8);

  ${Block}:hover & {
    filter: saturate(1);
    cursor: pointer;
  }
`
export const Footer = styled(FooterBase)``
