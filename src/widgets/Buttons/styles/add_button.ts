import styled from 'styled-components'

import type { TSpace } from '@/spec'
import css, { theme } from '@/utils/css'

import PlusSVG from '@/icons/Plus'

type TWrapper = {
  disabled: boolean
  dimWhenIdle: boolean
} & TSpace

export const Wrapper = styled.div<TWrapper>`
  position: relative;
  ${css.flex('align-center')};
  opacity: ${({ dimWhenIdle, disabled }) => (dimWhenIdle || disabled ? '0.65' : 1)};

  ${(props) => css.spaceMargins(props)};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  }

  transition: all 0.2s;
`
export const PlusIcon = styled(PlusSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 3px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Text = styled.div`
  font-size: 13px;
  color: ${theme('article.digest')};

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
  }

  transition: all 0.2s;
`
