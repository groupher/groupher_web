import styled, { css, theme } from '@/css'

import Input from '@/widgets/Input'
import MoreSVG from '@/icons/menu/MoreL'
import EditPenSVG from '@/icons/EditPen'
import ArrowSVG from '@/icons/Arrow'

export const Wrapper = styled.div`
  width: 100%;
`
export const ReadonlyWrapper = styled.div<{ editing: boolean }>`
  ${css.column()};
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

export const ReadOnlyHeader = styled.div<{ editing: boolean }>`
  ${css.row('align-center')};
  display: ${({ editing }) => (editing ? 'none' : 'flex')};
`

export const ActionWrapper = styled.div<{ editing: boolean }>`
  ${css.row('align-center')};
  margin-right: 2px;
  gap: 0 5px;

  opacity: ${({ editing }) => (editing ? 1 : 0)};

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
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

export const EditPenIcon = styled(EditPenSVG)<{ onClick: () => void }>`
  ${css.size(12)};
  ${iconBase};
  margin-left: 1px;
  margin-right: -1px;
`
export const SettingIcon = styled(MoreSVG)`
  ${css.size(14)};
  ${iconBase};
`

export const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(10)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);
  opacity: 0.8;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`

export const EditWrapper = styled.div`
  ${css.column()};
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
export const EditFooter = styled.div`
  ${css.row('justify-center')};
  width: 100%;
`
export const Label = styled.div`
  ${css.row('align-center')};
  font-size: 13px;
  color: ${theme('article.title')};
`
export const NotifyLabel = styled.div`
  font-size: 9px;
  color: ${theme('rainbow.red')};
  border: 1px solid;
  font-weight: 500;
  border-color: ${theme('rainbow.red')};
  border-radius: 4px;
  padding: 0 2px;
`
export const EditItem = styled.div`
  ${css.row('align-center')};
  width: 100%;
  margin-bottom: 12px;
`
export const EditTitle = styled(Label)`
  font-size: 12px;
  color: ${theme('article.title')};
  margin-bottom: 8px;
  margin-left: 1px;
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
    font-size: 12px;
    opacity: 0.8;
  }
`
