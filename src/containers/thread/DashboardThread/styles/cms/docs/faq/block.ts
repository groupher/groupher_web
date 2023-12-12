import type { TActive } from '@/spec'
import styled, { css, theme } from '@/css'

import { MarkdownStyles } from '@/widgets/Common'
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
export const Actions = styled.div<{ $rightOffset: boolean }>`
  ${css.row('align-center')}
  position: absolute;
  right: ${({ $rightOffset }) => ($rightOffset ? '-223px' : '-210px')};
  top: 5px;
  opacity: 0.4;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const DeleteWrapper = styled.div`
  ${css.row('align-center')};
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
export const DeleteHint = styled(Hint)`
  &:hover {
    font-weight: 500;
    color: ${theme('rainbow.red')};
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
  fill: ${theme('rainbow.red')};
  margin-right: 3px;
  margin-top: -1px;
`
export const Body = styled(MarkdownStyles)`
  margin-top: 10px;
  margin-bottom: 25px;
  word-wrap: break-word;
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
