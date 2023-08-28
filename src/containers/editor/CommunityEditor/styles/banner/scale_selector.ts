import styled from 'styled-components'

import type { TActive, TSpace } from '@/spec'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.flexColumn('align-center')};
  color: ${theme('article.digest')};
  width: 100%;
  margin-top: 10px;
`

export const SlideBox = styled.div`
  position: relative;
  ${css.flex('align-center', 'justify-around')};
  width: 100%;
  height: 28px;
  border: 1px solid;
  border-color: ${theme('editor.border')};
  border-radius: 20px;
`
export const Bar = styled.div<{ width: string }>`
  position: absolute;
  left: 0;
  top: -1px;
  border-radius: 15px;
  height: 28px;
  width: ${({ width }) => width};
  /* background: ${theme('article.title')}; */
  /* background: linear-gradient(to right, #333333, #828282); */
  background: linear-gradient(to right, #e29aaa, #c479de);
  transition: width 0.25s;
`
export const BarDot = styled.div`
  ${css.circle(20)};
  background: white;
  position: absolute;
  right: 3px;
  top: 4px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const IndexDot = styled.div`
  ${css.circle(6)};
  background-color: ${theme('editor.border')};
  margin-left: -8px;
  cursor: pointer;

  &:hover {
    ${css.circle(8)};
  }

  transition: all 0.2s;
`
export const Footer = styled.div`
  ${css.flex('align-center', 'justify-around')};
  width: 100%;
  margin-top: 7px;
`

type TNote = TActive & TSpace
export const Note = styled.div<TNote>`
  font-size: 12px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('lightText'))};
  font-weight: ${({ $active }) => ($active ? 500 : 400)};

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
    font-weight: 500;
  }

  transition: color 0.2s;

  ${(props) => css.spaceMargins(props)};
`
export const ShineNote = styled.div`
  font-size: 12px;
  background: linear-gradient(to right, #e29aaa, #c479de);
  font-weight: 550;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 500;
  cursor: pointer;
  margin-left: -22px;
`
