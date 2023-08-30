import styled from 'styled-components'

import type { TActive, TSizeTS, TSpace } from '@/spec'
import SIZE from '@/constant/size'
import css, { theme } from '@/css'

import Button from '@/widgets/Buttons/Button'
import ArrowSVG from '@/icons/ArrowSimple'

type TWrapper = { withBorder: boolean; size: TSizeTS } & TSpace & TActive

export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
  color: ${theme('article.digest')};

  border: ${({ withBorder }) => (withBorder ? '1px solid' : 'none')};
  border-color: ${({ withBorder }) => (withBorder ? theme('lightText') : theme('transparent'))};
  background: ${({ $active }) => ($active ? theme('hoverBg') : theme('transparent'))};

  border-radius: 10px;

  transform: ${({ size }) => (size === SIZE.TINY ? 'scale(0.85)' : 'none')};

  margin-top: ${({ top }) => `${top}px`};
  margin-bottom: ${({ bottom }) => `${bottom}px`};
  margin-left: ${({ left }) => `${left}px`};
  margin-right: ${({ right }) => `${right}px`};

  &:hover {
    background: ${theme('hoverBg')};
  }
`
export const Label = styled.div`
  opacity: 0.7;
`
export const InnerBtnWrapper = styled.div<TActive>`
  ${css.flex('align-center')};
  margin-left: 2px;
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-weight: 400;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    color: ${theme('article.title')};
  }

  transition: color 0.2s;
`
export const ButtonWrapper = styled(Button)`
  border: none !important;
`
export const FilterIcon = styled(ArrowSVG)`
  fill: ${theme('article.digest')};
  ${css.size(14)};
  transform: rotate(-90deg);
  margin-left: 5px;

  ${InnerBtnWrapper}:hover & {
    fill: ${theme('article.digest')};
  }

  ${css.media.mobile`
    margin-left: 3px;
    opacity: 0.6;
  `};
`
