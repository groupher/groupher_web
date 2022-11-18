import styled from 'styled-components'

import Img from '@/Img'
import css, { theme } from '@/utils/css'

const bgColor = '#02303e'

export const Wrapper = styled.div`
  width: 320px;
  color: ${theme('article.digest')};
  /* background: #02303e; */
  /* height: 90vh; */
  height: 100%;
  margin-right: 15px;
  flex-shrink: 0;
  border: 1px solid;
  border-color: ${bgColor};
  background-color: ${bgColor};
  border-radius: 3px;
  overflow-y: hidden;
`
export const Header = styled.div`
  position: relative;
  ${css.flex('align-center')};
  padding: 6px 8px 5px 0;
  color: ${theme('article.digest')};
`
export const FunctionIcon = styled(Img)`
  ${css.size(18)};
  fill: ${theme('article.digest')};
  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }
`
export const Title = styled.div`
  position: absolute;
  top: -2px;
  left: 0;
  background: #0d4152;
  padding: 2px 10px;
  color: #92a4a5;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  ${Wrapper}:hover & {
    font-weight: bold;
  }
  transition: all 0.2s;
`
// color: #cecece;
// padding: 8px 10px;
// color: #cecece;
// background: #006f74;
