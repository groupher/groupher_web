import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { animate, theme } from '@/css'

import UploadSVG from '@/icons/Upload'

import { Wrapper as Container } from '..'

export const Wrapper = styled.div`
  ${css.row('align-both')};
  position: absolute;
  bottom: 0;
  width: 440px;
  height: 65px;
  padding-top: 3px;
  border: 1px solid;
  border-color: ${theme('divider')};
  border-radius: 8px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: ${theme('alphaBg2')};
  backdrop-filter: blur(5px);
  z-index: 2;
  display: none;
  animation: ${animate.jump} 0.4s linear;

  ${Container}:hover & {
    display: flex;
  }
`
export const UploadIcon = styled(UploadSVG)`
  ${css.size(50)};
  fill: ${theme('article.info')};
  margin-bottom: 15px;
  opacity: 0.3;
`
export const Title = styled.div`
  color: ${theme('article.digest')};
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`
export const Desc = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  opacity: 0.8;
`
export const SettingBlock = styled.div<TActive>`
  ${css.size(29)};
  ${css.row('align-both')};
  border-radius: 2px;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : theme('divider'))};
  margin-top: 3px;
  margin-bottom: 7px;
  background: white;

  box-shadow: ${css.cardShadow};
  transition: all 0.3s;

  &:hover {
    border-color: ${theme('article.digest')};
  }
`
export const SettingTitle = styled.div<TActive>`
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-size: 9px;
  opacity: 0.8;

  transition: color 0.2s;
`
