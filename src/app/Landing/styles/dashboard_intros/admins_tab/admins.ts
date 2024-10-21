import styled, { css, theme } from '~/css'

import type { TActive } from '~/spec'
import Img from '~/Img'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 440px;
  height: auto;
  position: absolute;
  top: 10px;
  left: 20px;
`
export const InnerWrapper = styled.div`
  ${css.row('justify-between')};
  width: 100%;
  padding: 0 10px;
`
export const Header = styled.div`
  font-size: 20px;
  color: ${theme('rainbow.pink')};
  opacity: 0.8;
  font-weight: 500;
  margin-bottom: 20px;
`
export const Item = styled.div<TActive>`
  ${css.row('align-both')};
  background: ${({ $active }) => ($active ? theme('alphaBg') : '')};
  padding: 8px 10px;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('divider') : 'transparent')}; 
  border-radius: 8px;
  box-shadow: ${({ $active }) => ($active ? 'rgba(149, 157, 165, 0.18) 0px 8px 24px' : '')};
  opacity: ${({ $active }) => ($active ? 1 : 0.6)}; 
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(0.9)')}; 
  cursor: pointer;

  &:hover {
    border-color: ${theme('divider')};
    box-shadow: rgba(149, 157, 165, 0.18) 0px 8px 24px;
    background: ${theme('alphaBg')};
    transform: scale(1);
    opacity: 1;
  }

  transition: all .1s;
`
export const Avatar = styled(Img)`
  ${css.size(42)};
  border-radius: 10px;
`
export const Intro = styled.div`
  margin-left: 12px;
`
export const Nickname = styled.div`
  font-size: 15px;
  color: ${theme('article.title')};
  margin-bottom: 2px;
`
export const Highlight = styled.span`
  background-color: ${theme('rainbow.red')};
  color: ${theme('button.fg')};
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  margin-left: 1px;
  margin-right: 1px;
  font-weight: 600;
  opacity: 0.8;
`
export const Num = styled.span`
  font-size: 14;
  color: ${theme('rainbow.pink')};
  font-weight: 500;
  display: inline-block;
`
export const Desc = styled.div`
  font-size: 12px;
  color: ${theme('article.digest')};
`
