import styled, { css, theme } from '~/css'
import MoreSVG from '~/icons/menu/MoreL'
import EditSVG from '~/icons/EditPen'

import { ColumnWrapper } from '.'

export const Wrapper = styled.div`
  ${css.row('align-center')};
  width: 100%;
`

export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
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

export const SettingIcon = styled(MoreSVG)`
  ${css.size(14)};
  ${iconBase};
  opacity: 0;
  margin-right: 5px;

  ${ColumnWrapper}:hover & {
    opacity: 1;
  }
`
