import styled from 'styled-components'

import css, { theme } from '@/utils/css'

import MoreSVG from '@/icons/menu/MoreL'
import EditSVG from '@/icons/EditPen'
import ArrowSVG from '@/icons/Arrow'

import Input from '@/widgets/Input'

type TWrapper = { isEditMode: boolean; isSetting: boolean; hasSettingTag: boolean }
export const Wrapper = styled.div<TWrapper>`
  ${css.flex('align-center')};
  width: 100%;
  height: ${({ isEditMode }) => (isEditMode ? '46px' : '40px')};
  /* margin-left: -8px; */
  padding: ${({ isEditMode }) => (isEditMode ? 0 : '10px')};
  border: ${({ isEditMode }) => (isEditMode ? 'none' : '1px solid')};
  border-color: ${theme('divider')};
  border-radius: 5px;
  margin-bottom: 12px;

  opacity: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return 1
    return isSetting ? 1 : 0.3
  }};

  margin-left: ${({ isSetting, hasSettingTag }) => {
    if (!hasSettingTag) return '-8px'

    return isSetting ? '-12px' : '-8px'
  }};

  &:hover {
    background: ${({ isEditMode }) => (!isEditMode ? theme('hoverBg') : 'transparent')};
  }

  transition: all 0.2s;
`
type TDot = { color: string; isEditMode?: boolean }
export const Dot = styled.div<TDot>`
  ${({ isEditMode }) => (!isEditMode ? css.circle(11) : css.size(18))};
  background: ${({ color }) => color};
  border-radius: ${({ isEditMode }) => (isEditMode ? '4px' : '100%')};
`
export const DotSelector = styled.div`
  ${css.size(26)};
  ${css.flex('align-both')};
  border: 1px solid;
  border-color: ${theme('editor.border')};
  background: white;
  border-radius: 4px;
  margin-left: -6px;
  margin-right: 4px;
  cursor: pointer;
`
export const Title = styled.div`
  color: ${theme('article.title')};
  font-size: 14px;
  margin-left: 10px;
`
export const CatNote = styled.span`
  color: ${theme('article.digest')};
  opacity: 0.8;
  font-size: 12px;
  margin-left: 12px;

  &:before {
    content: '(';
    opacity: 0.5;
    margin-right: 1px;
  }

  &:after {
    content: ')';
    opacity: 0.5;
    margin-left: 1px;
  }
`
export const Actions = styled.div`
  ${css.flex('align-center')};
  opacity: 1;

  ${Wrapper}:hover & {
    opacity: 1;
  }

  transition: all 0.2s;
`
export const EditIcon = styled(EditSVG)<{ onClick: () => void }>`
  ${css.size(14)};
  fill: ${theme('article.digest')};
  margin-right: -4px;

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`
export const MoreIcon = styled(MoreSVG)`
  ${css.size(14)};
  fill: ${theme('article.digest')};

  &:hover {
    fill: ${theme('article.title')};
    cursor: pointer;
  }

  transition: all 0.2s;
`

export const ArrowUpIcon = styled(ArrowSVG)`
  ${css.size(11)};
  fill: ${theme('article.digest')};
  transform: rotate(90deg);
  margin-right: 6px;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
export const ArrowDownIcon = styled(ArrowUpIcon)`
  transform: rotate(-90deg);
`

export const InputWrapper = styled.div`
  width: auto;
`
export const Inputer = styled(Input)`
  width: 180px;
  height: 30px;
  margin-left: 10px;
`
