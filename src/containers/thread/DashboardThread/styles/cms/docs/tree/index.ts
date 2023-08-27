import styled from 'styled-components'

import type { TActive } from '@/spec'

import css, { theme } from '@/css'

import DragSVG from '@/icons/Dragble'
import ArrowSVG from '@/icons/ArrowSimple'
import DeleteSVG from '@/icons/Trash'
import EditSVG from '@/icons/EditPen'

export const Wrapper = styled.div`
  ${css.flex('align-start')};
  gap: 0 65px;
  margin-top: 32px;
  /* padding-left: 10px; */
`
export const Content = styled.div`
  ${css.flexColumn()};
`
type TFolderWrapper = TActive & { hasChild?: boolean }
export const FolderWrapper = styled.div<TFolderWrapper>`
  ${css.flex('align-center')};
  /* background: ${({ $active }) => ($active ? theme('hoverBg') : 'transparent')}; */
  background: ${({ $active }) =>
    $active ? 'linear-gradient(to right, #f7f7f7 50%, transparent)' : 'transparent'};
  border-radius: 6px;

  &:hover {
    background: linear-gradient(to right, #f7f7f7 50%, transparent);
    cursor: pointer;
  }
`

export const FolderName = styled.div<TFolderWrapper>`
  ${css.flex('align-center')};
  flex-grow: 1;
  font-size: 14px;
  color: ${theme('article.title')};
  padding: 3px 10px;
  padding-left: 18px;

  font-weight: ${({ hasChild, $active }) => (hasChild || $active ? 500 : 400)};
  line-height: ${({ hasChild }) => (hasChild ? '30px' : 'auto')};

  ${FolderWrapper}:hover & {
    font-weight: 500;
  }
`
export const ActionWrapper = styled.div`
  ${css.flex('align-center')};
  gap: 0 5px;
  opacity: 0;

  ${FolderWrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`

export const DragIcon = styled(DragSVG)`
  ${css.size(12)};
  position: absolute;
  left: 3px;
  fill: ${theme('article.title')};
  opacity: 0;

  ${FolderWrapper}:hover & {
    opacity: 1;
  }
`

export const EditIcon = styled(EditSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  &:hover {
    fill: ${theme('article.title')};
  }
`
export const DeleteIcon = styled(DeleteSVG)`
  ${css.size(12)};
  fill: ${theme('article.digest')};
  &:hover {
    fill: ${theme('baseColor.red')};
  }
`

export const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('article.title')};
  transform: rotate(-90deg);
  margin-left: 5px;
`
export const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(180deg);
`

type TCursor = {
  top: number
  left: number
}
export const CustomCursor = styled.div.attrs<TCursor>(({ top, left }) => ({
  style: {
    top: top - 5,
    left: left + 25,
  },
}))`
  position: absolute;
  width: 60%;
  border-bottom: 2px dashed;
  border-bottom-color: ${theme('article.digest')};

  &:before {
    content: 'o';
    position: absolute;
    left: -10px;
    top: -10px;
    font-size: 13px;
  }
`
