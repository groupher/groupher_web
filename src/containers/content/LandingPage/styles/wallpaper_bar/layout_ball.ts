import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Layout1SVG from './Layout1'
import Layout2SVG from './Layout2'

export const Wrapper = styled.div`
  ${css.size(26)};
  ${css.flex('align-both')}
  border-radius: 5px;
  background: ${theme('hoverBg')};
  border: 1px solid;
  border-color: ${theme('divider')};
  cursor: pointer;
`
export const Layout3Wrapper = styled.div`
  ${css.size(18)};
  border: 2px solid;
  border-color: ${theme('article.digest')};
  border-radius: 3px;
  position: relative;
  opacity: 0.6;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
export const Bar = styled.div`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 12px;
  height: 6px;
  border-radius: 2px;
  background: ${theme('article.digest')};
`
export const Layout1Icon = styled(Layout1SVG)`
  ${css.size(24)};
  fill: ${theme('article.digest')};
  opacity: 0.6;

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
export const Layout2Icon = styled(Layout2SVG)`
  ${css.size(24)};
  fill: ${theme('article.digest')};
  opacity: 0.6;
  transform: rotate(180deg);

  ${Wrapper}:hover & {
    opacity: 0.8;
  }
`
