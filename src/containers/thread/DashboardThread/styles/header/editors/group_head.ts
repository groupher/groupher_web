import styled from 'styled-components'

import css, { theme } from '@/utils/css'
import ArrowSVG from '@/icons/ArrowSimple'
import MoreSVG from '@/icons/menu/MoreL'
import EditSVG from '@/icons/EditPen'

import { ColumnWrapper } from '.'

export const Wrapper = styled.div`
  ${css.flex('align-center')};
  width: 100%;
  height: 22px;
`
export const Title = styled.div`
  ${css.flex('align-center')};
  color: ${theme('article.title')};
  font-size: 14px;
`
export const HintTitle = styled(Title)`
  color: ${theme('article.ditest')};
  margin-top: 4px;
  font-size: 12px;
  font-style: italic;
  opacity: 0.6;
`
const iconBase = `
  fill: ${theme('article.info')};
  opacity: 0.6;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const EditIcon = styled(EditSVG)<{ onClick: () => void }>`
  ${css.size(14)};
  ${iconBase};
  opacity: 0;
  margin-right: 3px;

  ${ColumnWrapper}:hover & {
    opacity: 0.8;
  }
`
export const ArrowIcon = styled(ArrowSVG)`
  ${css.size(15)};
  fill: ${theme('article.digest')};
  margin-left: 4px;
  transform: rotate(-90deg);
  opacity: 0.6;
`
export const SettingIcon = styled(MoreSVG)`
  ${css.size(14)};
  ${iconBase};
  opacity: 0;
  margin-right: 5px;

  ${ColumnWrapper}:hover & {
    opacity: 1;
  }
`
