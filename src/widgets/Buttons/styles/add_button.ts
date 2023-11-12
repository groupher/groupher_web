import styled from 'styled-components'

import css, { theme } from '@/css'

import PlusSVG from '@/icons/Plus'
import EditSVG from '@/icons/EditPen'
import { WithMargin } from '@/widgets/Common'

type TWrapper = {
  disabled: boolean
  $dimWhenIdle: boolean
}

export const Wrapper = styled(WithMargin)<TWrapper>`
  position: relative;
  ${css.row('align-center')};
  opacity: ${({ $dimWhenIdle, disabled }) => ($dimWhenIdle || disabled ? '0.65' : 1)};

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  }

  transition: all 0.2s;
`
export const EditIcon = styled(EditSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  margin-right: 3px;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
    opacity: 1;
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
