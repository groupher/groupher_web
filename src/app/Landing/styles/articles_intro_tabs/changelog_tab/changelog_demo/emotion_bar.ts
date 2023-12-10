import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/css'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  gap: 0 15px;
  width: 254px;
  height: 42px;
  z-index: 2;
  padding: 0 15px;
  background: ${theme('htmlBg')};
  border-radius: 10px;
  border: 1px solid;
  border-color: ${theme('divider')};
  box-shadow: rgba(100, 100, 111, 0.1) 1px 2px 29px 0px;

  position: absolute;
  bottom: 142px;
  right: 68px;
`
export const EmojiImg = styled(Img)`
  ${css.size(20)};
  opacity: 0.8;
`
export const Item = styled.div`
  ${css.row('align-both')};
  height: 1005;
`
export const Count = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${theme('article.digest')};
  opacity: 0.8;
  margin-left: 6px;
`
