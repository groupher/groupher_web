import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

import BackSVG from '@/icons/Back'

const spaceStyles = (props: TSpace) => {
  const { top = 0, bottom = 0, left = 0, right = 0 } = props

  return `
    margin-top: ${top}px;
    margin-bottom: ${bottom}px;
    margin-left: ${left}px;
    margin-right: ${right}px;
  `
}

export const Wrapper = styled.div<TSpace>`
  ${css.flex('align-both')};
  font-size: 12px;
  color: ${theme('article.digest')};
  font-weight: 500;

  &:hover {
    color: ${theme('article.title')};
  }

  cursor: pointer;
  transition: all 0.2s;

  ${(props) => spaceStyles(props)};
`

export const BackIcon = styled(BackSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 5px;
  opacity: 0.8;

  ${Wrapper}:hover & {
    fill: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
