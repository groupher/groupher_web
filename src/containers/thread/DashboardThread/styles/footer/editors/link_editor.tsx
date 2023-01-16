import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import Input from '@/widgets/Input'
import MoreSVG from '@/icons/menu/MoreL'
import EditPenSVG from '@/icons/EditPen'

export const Wrapper = styled.div``
export const ReadonlyWrapper = styled.div<{ editing: boolean }>`
  ${css.flex('align-start', 'justify-between')};
  gap: 0 10px;

  ${({ editing }) => editing && 'padding-top: 20px; border-top: 1px solid transparent;'};

  border-image: linear-gradient(
    0.28turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

export const ReadOnlyFields = styled.div<{ alignRight: boolean }>`
  ${({ alignRight }) => (alignRight ? css.flexColumn('align-end') : '')};
`

export const ActionWrapper = styled.div<{ editing: boolean }>`
  ${css.flex('align-center')};
  margin-right: -5px;
  margin-top: 3px;
  gap: 0 5px;

  opacity: ${({ editing }) => (editing ? 1 : 0)};

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
const iconBase = `
  fill: ${theme('article.info')};
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const EditPenIcon = styled(EditPenSVG)`
  ${css.size(12)};
  ${iconBase};
`
export const SettingIcon = styled(MoreSVG)`
  ${css.size(14)};
  ${iconBase};
`

export const EditWrapper = styled.div`
  ${css.flexColumn()};
  margin-top: 10px;
  padding-bottom: 20px;

  border-bottom: 1px solid transparent;
  border-image: linear-gradient(
    0.26turn,
    transparent,
    ${theme('divider')},
    ${theme('divider')},
    ${theme('divider')},
    transparent
  );

  border-image-slice: 1;
`

export const Label = styled.div`
  ${css.flex('align-center')};
  font-size: 13px;
  color: ${theme('article.title')};
`
export const NotifyLabel = styled.div`
  font-size: 9px;
  color: ${theme('baseColor.red')};
  border: 1px solid;
  font-weight: 500;
  border-color: ${theme('baseColor.red')};
  border-radius: 4px;
  padding: 0 2px;
`
export const EditItem = styled.div`
  ${css.flex('align-center')};
  width: 100%;
  gap: 0 10px;
  margin-left: 1px;
  margin-bottom: 10px;
`
export const EditLabel = styled(Label)`
  font-size: 12px;
  white-space: nowrap;
  margin-right: 6px;
  opacity: 0.7;
`

export const Inputer = styled(Input)`
  width: 100%;
  height: 28px;
  font-size: 13px;
  background: transparent;
  /* border: 1px solid;
  border-color: ${theme('divider')}; */

  ::placeholder {
    color: ${theme('article.digest')};
    opacity: 0.8;
  }
`
