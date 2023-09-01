import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/css'

import ArrowSVG from '@/icons/ArrowSimple'

import Button from '@/widgets/Buttons/Button'

export const Wrapper = styled.div`
  ${css.column('align-both')};
  width: 100%;
  height: 100%;
  gap: 15px;
  padding-top: 40px;
  padding-bottom: 30px;

  border-top: 1px solid;
  border-top-color: ${theme('divider')};

  border-bottom: 1px solid;
  border-bottom-color: ${theme('divider')};
`
export const TemplateBlock = styled.div<TActive>`
  width: 100%;
  border: 1px solid;
  border-color: ${({ $active }) => ($active ? theme('article.digest') : theme('divider'))};
  box-shadow: ${({ $active }) => ($active ? css.cardShadow : '')};

  border-radius: 5px;

  &:hover {
    border-color: ${theme('article.digest')};
    box-shadow: ${css.cardShadow};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const ArrowIcon = styled(ArrowSVG)<{ rotate?: boolean }>`
  ${css.size(14)};
  fill: ${theme('article.title')};
  margin-left: 5px;
  transform: ${({ rotate }) => (rotate ? 'rotate(90deg);' : 'rotate(180deg);')};
`

export const ToggleButton = styled(Button)``

export const ToggleText = styled.div`
  ${css.row('align-center')};
  opacity: 0.8;

  ${ToggleButton}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
