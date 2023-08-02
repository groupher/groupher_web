import styled from 'styled-components'

import type { TActive } from '@/spec'
import css, { theme } from '@/utils/css'

import EditSVG from '@/icons/EditPen'
import DeleteSVG from '@/icons/Delete'
import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  position: relative;
`
export const Title = styled.div<TActive>`
  ${css.cutRest('440px')};
  color: ${({ $active }) => ($active ? theme('article.title') : theme('article.digest'))};
  font-size: 17px;
  font-weight: 500;
`
export const Actions = styled.div`
  ${css.flex('align-center')}
  position: absolute;
  right: -208px;
  top: 5px;
  opacity: 0.5;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const Hint = styled.div`
  color: ${theme('article.digest')};
  font-size: 12px;
  margin-right: 15px;

  &:hover {
    color: ${theme('article.title')};
    cursor: pointer;
  }
`
export const EditIcon = styled(EditSVG)`
  fill: ${theme('article.digest')};
  ${css.size(13)};
  margin-right: 2px;
  margin-top: -1px;
`
export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(13)};
  fill: ${theme('baseColor.red')};
  margin-right: 3px;
  margin-top: -1px;
`
export const Body = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
`

export const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);
  margin-right: 5px;
  cursor: pointer;

  ${Wrapper}:hover & {
    color: ${theme('article.title')};
  }
`
export const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`
